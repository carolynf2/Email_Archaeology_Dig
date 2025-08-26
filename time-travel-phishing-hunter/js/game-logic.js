// Time Travel Phishing Hunter - Game Logic

class TimePhishingGame {
    constructor() {
        this.gameState = {
            currentEra: null,
            currentScenario: 0,
            gameMode: 'story',
            score: 0,
            timeRemaining: 1800, // 30 minutes
            completedEras: [],
            playerStats: {
                correctAnswers: 0,
                totalAnswers: 0,
                streakCount: 0,
                maxStreak: 0,
                redFlagsFound: 0,
                speedAnswers: 0,
                perfectRedFlagStreak: 0,
                currentRedFlagStreak: 0,
                historicalContextsRead: 0,
                crossEraPatterns: 0,
                rareRedFlagsFound: 0,
                eraAccuracy: {}
            },
            achievements: [],
            currentScenarioData: null,
            scenarioStartTime: null,
            selectedRedFlags: [],
            confidence: 'high',
            suspicionLevel: 5,
            eraTimer: null,
            scenarioTimer: null
        };

        this.initializeGame();
    }

    initializeGame() {
        this.updateMainMenuStats();
        this.setupEventListeners();
        this.loadGameProgress();
    }

    // Game State Management
    loadGameProgress() {
        // In this implementation, we'll start fresh each time
        // In a full version, this would load from localStorage
        this.unlockFirstEra();
    }

    unlockFirstEra() {
        ERAS['early-internet'].unlocked = true;
    }

    updateMainMenuStats() {
        const rank = this.calculateAgentRank();
        document.getElementById('agent-rank').textContent = rank;
        document.getElementById('total-score').textContent = this.gameState.score.toLocaleString();
        document.getElementById('eras-completed').textContent = `${this.gameState.completedEras.length}/6`;
        
        const accuracy = this.gameState.playerStats.totalAnswers > 0 
            ? Math.round((this.gameState.playerStats.correctAnswers / this.gameState.playerStats.totalAnswers) * 100)
            : 0;
        document.getElementById('overall-accuracy').textContent = `${accuracy}%`;
    }

    calculateAgentRank() {
        const score = this.gameState.score;
        const completed = this.gameState.completedEras.length;
        
        if (completed >= 6) return 'Time Master';
        if (completed >= 4) return 'Senior Agent';
        if (completed >= 2) return 'Field Agent';
        if (score >= 500) return 'Junior Agent';
        if (score >= 100) return 'Trainee Agent';
        return 'Novice Agent';
    }

    // Screen Navigation
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
        
        // Apply era-specific styling
        if (this.gameState.currentEra) {
            const era = ERAS[this.gameState.currentEra];
            document.body.className = era.theme.className;
        } else {
            document.body.className = '';
        }
    }

    // Game Mode Functions
    startStoryMode() {
        this.gameState.gameMode = 'story';
        document.getElementById('current-mode').textContent = 'Story Mode';
        this.showTimeline();
    }

    startPracticeMode() {
        this.gameState.gameMode = 'practice';
        document.getElementById('current-mode').textContent = 'Practice Mode';
        this.showTimeline();
    }

    showMainMenu() {
        this.showScreen('main-menu');
        this.updateMainMenuStats();
        this.stopAllTimers();
    }

    showTimeline() {
        this.displayTimeline();
        this.showScreen('timeline-screen');
    }

    showAchievements() {
        this.displayAchievements();
        this.showScreen('achievements-screen');
    }

    // Timeline Management
    displayTimeline() {
        const timelineTrack = document.getElementById('timeline-track');
        timelineTrack.innerHTML = '';

        Object.values(ERAS).forEach(era => {
            const node = document.createElement('div');
            node.className = `timeline-node ${era.theme.className}`;
            
            if (era.unlocked) {
                node.classList.add('unlocked');
                node.onclick = () => this.selectEra(era.id);
            } else {
                node.classList.add('locked');
            }
            
            if (this.gameState.completedEras.includes(era.id)) {
                node.classList.add('completed');
            }
            
            if (this.gameState.currentEra === era.id) {
                node.classList.add('current');
            }

            node.innerHTML = `
                <div class="node-icon">${era.icon}</div>
                <div class="node-years">${era.yearRange}</div>
            `;

            timelineTrack.appendChild(node);
        });
    }

    selectEra(eraId) {
        const era = ERAS[eraId];
        if (!era || !era.unlocked) return;

        this.gameState.currentEra = eraId;
        this.gameState.currentScenario = 0;
        this.showLoadingScreen();
        
        setTimeout(() => {
            this.startEra(eraId);
        }, 2000);
    }

    showLoadingScreen() {
        document.getElementById('loading-screen').classList.add('active');
        const messages = GAME_MESSAGES.loading;
        let messageIndex = 0;
        
        const messageInterval = setInterval(() => {
            document.getElementById('loading-text').textContent = messages[messageIndex];
            messageIndex = (messageIndex + 1) % messages.length;
        }, 400);
        
        setTimeout(() => {
            clearInterval(messageInterval);
            document.getElementById('loading-screen').classList.remove('active');
        }, 2000);
    }

    // Era Management
    startEra(eraId) {
        const era = ERAS[eraId];
        this.gameState.currentEra = eraId;
        this.gameState.currentScenario = 0;
        this.gameState.timeRemaining = 1800; // 30 minutes
        
        this.setupEraInterface(era);
        this.loadScenario();
        this.startEraTimer();
        this.showScreen('era-screen');
    }

    setupEraInterface(era) {
        document.getElementById('era-name').textContent = era.name;
        document.getElementById('era-years').textContent = era.yearRange;
        document.getElementById('era-description').textContent = era.description;
        
        const scenarios = SCENARIOS[era.id] || [];
        document.getElementById('total-scenarios').textContent = scenarios.length;
        
        // Update technology context
        const techFeatures = document.getElementById('tech-features');
        techFeatures.innerHTML = '';
        era.technology.forEach(tech => {
            const feature = document.createElement('div');
            feature.className = 'tech-feature';
            feature.textContent = tech;
            techFeatures.appendChild(feature);
        });
    }

    loadScenario() {
        const eraScenarios = SCENARIOS[this.gameState.currentEra] || [];
        if (this.gameState.currentScenario >= eraScenarios.length) {
            this.completeEra();
            return;
        }

        const scenario = eraScenarios[this.gameState.currentScenario];
        this.gameState.currentScenarioData = scenario;
        this.gameState.selectedRedFlags = [];
        this.gameState.confidence = 'high';
        this.gameState.suspicionLevel = 5;
        
        this.displayScenario(scenario);
        this.setupAnalysisPanel(scenario);
        this.updateProgressDisplay();
        this.startScenarioTimer();
    }

    displayScenario(scenario) {
        const container = document.getElementById('scenario-container');
        container.innerHTML = `
            <div class="scenario-header">
                <h3 class="scenario-title">${scenario.title}</h3>
                <span class="scenario-difficulty ${scenario.difficulty}">${scenario.difficulty.toUpperCase()}</span>
            </div>
            <div class="scenario-content">
                <div class="email-preview" onclick="openEmailViewer()">
                    <div class="email-preview-header">
                        <div class="email-preview-meta"><strong>From:</strong> ${scenario.content.sender}</div>
                        <div class="email-preview-meta"><strong>Subject:</strong> ${scenario.content.subject}</div>
                        <div class="email-preview-meta"><strong>Date:</strong> ${scenario.content.date}</div>
                    </div>
                    <div class="email-preview-body">${scenario.content.body.substring(0, 200)}...</div>
                </div>
                <div id="analysis-panel" class="analysis-panel">
                    <!-- Analysis panel will be populated -->
                </div>
            </div>
        `;
    }

    setupAnalysisPanel(scenario) {
        const panel = document.getElementById('analysis-panel');
        panel.innerHTML = `
            <h3>🔍 Phishing Analysis</h3>
            
            <div class="red-flags-section">
                <h4>Red Flag Checklist</h4>
                <div id="red-flags-list" class="red-flags-list">
                    ${Object.values(RED_FLAGS).map(flag => `
                        <div class="red-flag-item" data-flag="${flag.id}" onclick="toggleRedFlag('${flag.id}')">
                            <div class="red-flag-checkbox" id="flag-${flag.id}"></div>
                            <div class="red-flag-text">${flag.text}</div>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="suspicion-section">
                <h4>Suspicion Level</h4>
                <div class="suspicion-slider">
                    <input type="range" id="suspicion-level" min="1" max="10" value="5" 
                           oninput="updateSuspicionDisplay(this.value)">
                    <div class="slider-labels">
                        <span>Legitimate</span>
                        <span id="suspicion-value">5</span>
                        <span>Phishing</span>
                    </div>
                </div>
            </div>

            <div class="confidence-section">
                <h4>Confidence Level</h4>
                <div class="confidence-buttons">
                    <button class="confidence-btn" data-confidence="low" onclick="setConfidence('low')">
                        Unsure
                    </button>
                    <button class="confidence-btn" data-confidence="medium" onclick="setConfidence('medium')">
                        Somewhat Sure
                    </button>
                    <button class="confidence-btn active" data-confidence="high" onclick="setConfidence('high')">
                        Very Sure
                    </button>
                </div>
            </div>

            <div class="decision-section">
                <button id="legitimate-btn" class="decision-btn legitimate" onclick="submitAnswer('legitimate')">
                    ✅ LEGITIMATE
                </button>
                <button id="phishing-btn" class="decision-btn phishing" onclick="submitAnswer('phishing')">
                    ⚠️ PHISHING
                </button>
            </div>
        `;
    }

    updateProgressDisplay() {
        document.getElementById('current-scenario-num').textContent = this.gameState.currentScenario + 1;
        const totalScenarios = SCENARIOS[this.gameState.currentEra]?.length || 1;
        const progress = ((this.gameState.currentScenario + 1) / totalScenarios) * 100;
        document.getElementById('scenario-progress').style.width = `${progress}%`;
    }

    // Email Viewer
    openEmailViewer() {
        if (!this.gameState.currentScenarioData) return;
        
        const scenario = this.gameState.currentScenarioData;
        const viewer = document.getElementById('email-viewer');
        
        document.getElementById('email-from').textContent = scenario.content.sender;
        document.getElementById('email-to').textContent = 'you@email.com';
        document.getElementById('email-subject').textContent = scenario.content.subject;
        document.getElementById('email-date').textContent = scenario.content.date;
        document.getElementById('email-content').innerHTML = scenario.content.body.replace(/\n/g, '<br>');
        
        // Handle attachments
        const attachmentsDiv = document.getElementById('email-attachments');
        if (scenario.content.attachments && scenario.content.attachments.length > 0) {
            attachmentsDiv.innerHTML = `
                <h4>Attachments:</h4>
                ${scenario.content.attachments.map(att => `<div class="attachment">${att}</div>`).join('')}
            `;
        } else {
            attachmentsDiv.innerHTML = '';
        }
        
        viewer.classList.add('active');
    }

    closeEmailViewer() {
        document.getElementById('email-viewer').classList.remove('active');
    }

    toggleMagnifier() {
        const magnifier = document.getElementById('magnifier');
        magnifier.classList.toggle('hidden');
        
        if (!magnifier.classList.contains('hidden')) {
            document.addEventListener('mousemove', this.updateMagnifierPosition);
        } else {
            document.removeEventListener('mousemove', this.updateMagnifierPosition);
        }
    }

    updateMagnifierPosition(e) {
        const magnifier = document.getElementById('magnifier');
        magnifier.style.left = (e.clientX - 100) + 'px';
        magnifier.style.top = (e.clientY - 100) + 'px';
    }

    // Red Flag Management
    toggleRedFlag(flagId) {
        const index = this.gameState.selectedRedFlags.indexOf(flagId);
        const checkbox = document.getElementById(`flag-${flagId}`);
        const item = checkbox.parentElement;
        
        if (index === -1) {
            this.gameState.selectedRedFlags.push(flagId);
            checkbox.classList.add('checked');
            checkbox.textContent = '✓';
            item.classList.add('selected');
        } else {
            this.gameState.selectedRedFlags.splice(index, 1);
            checkbox.classList.remove('checked');
            checkbox.textContent = '';
            item.classList.remove('selected');
        }
    }

    updateSuspicionDisplay(value) {
        this.gameState.suspicionLevel = parseInt(value);
        document.getElementById('suspicion-value').textContent = value;
    }

    setConfidence(level) {
        this.gameState.confidence = level;
        document.querySelectorAll('.confidence-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-confidence="${level}"]`).classList.add('active');
    }

    // Timer Management
    startEraTimer() {
        this.stopEraTimer();
        this.eraTimerInterval = setInterval(() => {
            this.gameState.timeRemaining -= 1;
            this.updateEraTimerDisplay();
            
            if (this.gameState.timeRemaining <= 0) {
                this.handleEraTimeout();
            }
        }, 1000);
    }

    stopEraTimer() {
        if (this.eraTimerInterval) {
            clearInterval(this.eraTimerInterval);
            this.eraTimerInterval = null;
        }
    }

    updateEraTimerDisplay() {
        const minutes = Math.floor(this.gameState.timeRemaining / 60);
        const seconds = this.gameState.timeRemaining % 60;
        const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        document.getElementById('era-time-remaining').textContent = timeString;
    }

    startScenarioTimer() {
        this.gameState.scenarioStartTime = Date.now();
        this.scenarioTimeRemaining = 120; // 2 minutes
        
        document.getElementById('scenario-timer').classList.add('active');
        document.getElementById('score-tracker').classList.add('active');
        
        this.stopScenarioTimer();
        this.scenarioTimerInterval = setInterval(() => {
            this.scenarioTimeRemaining -= 1;
            this.updateScenarioTimerDisplay();
            
            if (this.scenarioTimeRemaining <= 0) {
                this.handleScenarioTimeout();
            }
        }, 1000);
    }

    stopScenarioTimer() {
        if (this.scenarioTimerInterval) {
            clearInterval(this.scenarioTimerInterval);
            this.scenarioTimerInterval = null;
        }
    }

    updateScenarioTimerDisplay() {
        const minutes = Math.floor(this.scenarioTimeRemaining / 60);
        const seconds = this.scenarioTimeRemaining % 60;
        const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        const timerDisplay = document.getElementById('scenario-time');
        
        timerDisplay.textContent = timeString;
        timerDisplay.className = '';
        
        if (this.scenarioTimeRemaining <= 30) {
            timerDisplay.classList.add('timer-danger');
        } else if (this.scenarioTimeRemaining <= 60) {
            timerDisplay.classList.add('timer-warning');
        }
    }

    stopAllTimers() {
        this.stopEraTimer();
        this.stopScenarioTimer();
        document.getElementById('scenario-timer').classList.remove('active');
        document.getElementById('score-tracker').classList.remove('active');
    }

    handleEraTimeout() {
        this.stopAllTimers();
        alert('Era time limit reached! Moving to results...');
        this.completeEra();
    }

    handleScenarioTimeout() {
        this.submitAnswer('timeout');
    }

    // Answer Submission
    submitAnswer(answer) {
        if (!this.gameState.currentScenarioData || answer === 'timeout') {
            if (answer === 'timeout') {
                this.processIncorrectAnswer('Time\'s up!');
            }
            return;
        }

        const scenario = this.gameState.currentScenarioData;
        const isCorrect = (answer === scenario.correctAnswer);
        const responseTime = Date.now() - this.gameState.scenarioStartTime;
        
        this.stopScenarioTimer();
        
        if (isCorrect) {
            this.processCorrectAnswer(scenario, responseTime);
        } else {
            this.processIncorrectAnswer('Incorrect answer');
        }
    }

    processCorrectAnswer(scenario, responseTime) {
        this.gameState.playerStats.correctAnswers++;
        this.gameState.playerStats.totalAnswers++;
        this.gameState.playerStats.streakCount++;
        this.gameState.playerStats.maxStreak = Math.max(
            this.gameState.playerStats.maxStreak, 
            this.gameState.playerStats.streakCount
        );

        // Calculate score
        let points = scenario.points || 100;
        let speedBonus = 0;
        let redFlagBonus = 0;

        // Speed bonus
        if (responseTime < 30000) { // 30 seconds
            speedBonus = 50;
            this.gameState.playerStats.speedAnswers++;
        }

        // Red flag bonus
        const correctFlags = scenario.redFlags || [];
        const correctFlagsFound = this.gameState.selectedRedFlags.filter(flag => 
            correctFlags.some(scenarioFlag => 
                scenarioFlag.toLowerCase().includes(RED_FLAGS[flag]?.text.toLowerCase())
            )
        ).length;
        
        redFlagBonus = correctFlagsFound * 25;
        this.gameState.playerStats.redFlagsFound += correctFlagsFound;

        // Streak multiplier
        if (this.gameState.playerStats.streakCount >= 5) {
            points = Math.floor(points * 1.5);
        }

        const totalPoints = points + speedBonus + redFlagBonus;
        this.gameState.score += totalPoints;

        this.showResultsModal({
            correct: true,
            basePoints: points,
            speedBonus: speedBonus,
            redFlagBonus: redFlagBonus,
            totalPoints: totalPoints,
            scenario: scenario,
            responseTime: responseTime
        });

        this.updateScoreDisplay();
    }

    processIncorrectAnswer(reason) {
        this.gameState.playerStats.totalAnswers++;
        this.gameState.playerStats.streakCount = 0;

        this.showResultsModal({
            correct: false,
            reason: reason,
            scenario: this.gameState.currentScenarioData,
            basePoints: 0,
            speedBonus: 0,
            redFlagBonus: 0,
            totalPoints: 0
        });
    }

    updateScoreDisplay() {
        document.getElementById('current-score').textContent = this.gameState.score;
        document.getElementById('current-streak').textContent = this.gameState.playerStats.streakCount;
    }

    // Results Modal
    showResultsModal(results) {
        const modal = document.getElementById('results-modal');
        
        document.getElementById('result-title').textContent = results.correct ? 'Correct!' : 'Incorrect';
        document.getElementById('result-icon').textContent = results.correct ? '✅' : '❌';
        
        document.getElementById('base-points').textContent = results.basePoints;
        document.getElementById('speed-bonus').textContent = results.speedBonus;
        document.getElementById('redflag-bonus').textContent = results.redFlagBonus;
        document.getElementById('total-points').textContent = results.totalPoints;
        
        if (results.scenario) {
            document.getElementById('scenario-explanation').textContent = results.scenario.explanation;
            document.getElementById('historical-explanation').textContent = results.scenario.historicalContext;
            
            // Update historical contexts read counter
            this.gameState.playerStats.historicalContextsRead++;
            
            this.displayRedFlagsReview(results.scenario);
        }
        
        modal.classList.add('active');
    }

    displayRedFlagsReview(scenario) {
        const reviewDiv = document.getElementById('flags-review');
        const correctFlags = scenario.redFlags || [];
        
        reviewDiv.innerHTML = '';
        
        // Show correctly identified flags
        this.gameState.selectedRedFlags.forEach(flagId => {
            const flag = RED_FLAGS[flagId];
            if (!flag) return;
            
            const isCorrect = correctFlags.some(scenarioFlag => 
                scenarioFlag.toLowerCase().includes(flag.text.toLowerCase())
            );
            
            const item = document.createElement('div');
            item.className = `flag-review-item ${isCorrect ? 'correct' : 'false-positive'}`;
            item.innerHTML = `
                <span>${isCorrect ? '✅' : '⚠️'}</span>
                <span>${flag.text} - ${isCorrect ? 'Correct!' : 'Not present in this scenario'}</span>
            `;
            reviewDiv.appendChild(item);
        });
        
        // Show missed flags
        correctFlags.forEach(scenarioFlag => {
            const wasFound = this.gameState.selectedRedFlags.some(flagId => {
                const flag = RED_FLAGS[flagId];
                return flag && scenarioFlag.toLowerCase().includes(flag.text.toLowerCase());
            });
            
            if (!wasFound) {
                const item = document.createElement('div');
                item.className = 'flag-review-item missed';
                item.innerHTML = `
                    <span>❌</span>
                    <span>Missed: ${scenarioFlag}</span>
                `;
                reviewDiv.appendChild(item);
            }
        });
    }

    closeResultsModal() {
        document.getElementById('results-modal').classList.remove('active');
    }

    nextScenario() {
        this.closeResultsModal();
        this.gameState.currentScenario++;
        this.loadScenario();
    }

    // Era Completion
    completeEra() {
        this.stopAllTimers();
        
        if (!this.gameState.completedEras.includes(this.gameState.currentEra)) {
            this.gameState.completedEras.push(this.gameState.currentEra);
            this.gameState.score += 500; // Era completion bonus
        }
        
        // Calculate era accuracy
        const eraScenarios = SCENARIOS[this.gameState.currentEra] || [];
        const accuracy = eraScenarios.length > 0 ? 
            (this.gameState.playerStats.correctAnswers / eraScenarios.length) : 0;
        
        this.gameState.playerStats.eraAccuracy[this.gameState.currentEra] = accuracy;
        
        // Unlock next era if accuracy is good enough
        if (accuracy >= 0.7) {
            this.unlockNextEra();
        }
        
        this.checkAchievements();
        this.showEraCompleteModal(accuracy);
    }

    unlockNextEra() {
        const eraOrder = ['early-internet', 'dotcom-boom', 'social-media', 'mobile-revolution', 'ai-deepfakes', 'future-threats'];
        const currentIndex = eraOrder.indexOf(this.gameState.currentEra);
        
        if (currentIndex >= 0 && currentIndex < eraOrder.length - 1) {
            const nextEraId = eraOrder[currentIndex + 1];
            ERAS[nextEraId].unlocked = true;
        }
    }

    showEraCompleteModal(accuracy) {
        const modal = document.getElementById('era-complete-modal');
        
        document.getElementById('era-accuracy').textContent = `${Math.round(accuracy * 100)}%`;
        document.getElementById('era-score').textContent = this.gameState.score.toLocaleString();
        
        // Show new achievements
        this.displayNewAchievements();
        
        modal.classList.add('active');
    }

    proceedToNextEra() {
        document.getElementById('era-complete-modal').classList.remove('active');
        this.showTimeline();
    }

    replayEra() {
        document.getElementById('era-complete-modal').classList.remove('active');
        this.startEra(this.gameState.currentEra);
    }

    // Achievements System
    checkAchievements() {
        Object.values(ACHIEVEMENTS).forEach(achievement => {
            if (!achievement.unlocked && achievement.condition(this.gameState.playerStats)) {
                this.unlockAchievement(achievement.id);
            }
        });
    }

    unlockAchievement(achievementId) {
        const achievement = ACHIEVEMENTS[achievementId];
        if (!achievement || achievement.unlocked) return;
        
        achievement.unlocked = true;
        this.gameState.achievements.push(achievementId);
        
        // Show achievement notification (could be enhanced with animation)
        console.log(`Achievement unlocked: ${achievement.title}`);
    }

    displayNewAchievements() {
        const newAchievementsDiv = document.getElementById('new-achievements');
        const newAchievements = this.gameState.achievements.filter(id => 
            !this.previousAchievements?.includes(id)
        );
        
        if (newAchievements.length === 0) {
            newAchievementsDiv.innerHTML = '<p>No new achievements this era.</p>';
            return;
        }
        
        newAchievementsDiv.innerHTML = newAchievements.map(id => {
            const achievement = ACHIEVEMENTS[id];
            return `
                <div class="achievement-card unlocked">
                    <div class="achievement-icon">${achievement.icon}</div>
                    <div class="achievement-title">${achievement.title}</div>
                    <div class="achievement-desc">${achievement.description}</div>
                </div>
            `;
        }).join('');
        
        this.previousAchievements = [...this.gameState.achievements];
    }

    displayAchievements() {
        const learningAchievements = document.getElementById('learning-achievements');
        const discoveryAchievements = document.getElementById('discovery-achievements');
        
        learningAchievements.innerHTML = '';
        discoveryAchievements.innerHTML = '';
        
        Object.values(ACHIEVEMENTS).forEach(achievement => {
            const achievementCard = document.createElement('div');
            achievementCard.className = `achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`;
            
            let progressText = '';
            if (achievement.progress !== undefined && achievement.target) {
                progressText = `<div class="achievement-progress">${achievement.progress}/${achievement.target}</div>`;
            }
            
            achievementCard.innerHTML = `
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-title">${achievement.title}</div>
                <div class="achievement-desc">${achievement.description}</div>
                ${progressText}
            `;
            
            if (achievement.category === 'learning') {
                learningAchievements.appendChild(achievementCard);
            } else {
                discoveryAchievements.appendChild(achievementCard);
            }
        });
    }

    setupEventListeners() {
        // Close modals when clicking outside
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal')) {
                e.target.classList.remove('active');
            }
        });
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeEmailViewer();
                document.querySelectorAll('.modal').forEach(modal => {
                    modal.classList.remove('active');
                });
            }
        });
    }
}

// Global Game Instance
let game;

// Global Functions (called by HTML)
function startStoryMode() {
    game.startStoryMode();
}

function startPracticeMode() {
    game.startPracticeMode();
}

function showMainMenu() {
    game.showMainMenu();
}

function showTimeline() {
    game.showTimeline();
}

function showAchievements() {
    game.showAchievements();
}

function openEmailViewer() {
    game.openEmailViewer();
}

function closeEmailViewer() {
    game.closeEmailViewer();
}

function toggleMagnifier() {
    game.toggleMagnifier();
}

function toggleRedFlag(flagId) {
    game.toggleRedFlag(flagId);
}

function updateSuspicionDisplay(value) {
    game.updateSuspicionDisplay(value);
}

function setConfidence(level) {
    game.setConfidence(level);
}

function submitAnswer(answer) {
    game.submitAnswer(answer);
}

function closeResultsModal() {
    game.closeResultsModal();
}

function nextScenario() {
    game.nextScenario();
}

function proceedToNextEra() {
    game.proceedToNextEra();
}

function replayEra() {
    game.replayEra();
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', function() {
    game = new TimePhishingGame();
});