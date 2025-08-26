// Email Archaeology Dig - Game Logic

class EmailArchaeologyDig {
    constructor() {
        this.gameState = {
            experienceLevel: 'Novice Digger',
            artifactsFound: 0,
            sitesExcavated: 0,
            currentSite: null,
            currentLayer: 1,
            discoveries: [],
            unlockedArtifacts: [],
            completedSites: []
        };

        this.loadGameState();
        this.initializeGame();
    }

    initializeGame() {
        this.generateForensicsTools();
        this.generateExcavationSites();
        this.generateArtifactTypes();
        this.updateMainMenuStats();
    }

    // Save and Load System
    saveGameState() {
        localStorage.setItem('emailArchaeologyDig', JSON.stringify(this.gameState));
    }

    loadGameState() {
        const saved = localStorage.getItem('emailArchaeologyDig');
        if (saved) {
            this.gameState = { ...this.gameState, ...JSON.parse(saved) };
        }
    }

    // Screen Management
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    // Forensics Tools System
    generateForensicsTools() {
        this.forensicsTools = {
            'header-analyzer': {
                name: 'Header Analyzer',
                emoji: '🔍',
                description: 'Examines email routing, authentication records, and server information to detect spoofing.',
                uses: 'Identifies fake senders, routing anomalies, and authentication failures',
                analysisFunction: this.analyzeHeaders.bind(this)
            },
            'link-inspector': {
                name: 'Link Inspector', 
                emoji: '🔗',
                description: 'Traces URLs, identifies redirects, and checks domain reputation to uncover malicious links.',
                uses: 'Detects URL shorteners, suspicious domains, and redirect chains',
                analysisFunction: this.analyzeLinks.bind(this)
            },
            'linguistic-scanner': {
                name: 'Linguistic Scanner',
                emoji: '📝',
                description: 'Analyzes language patterns, grammar, and writing style to identify social engineering.',
                uses: 'Spots urgency tactics, poor grammar, and manipulative language',
                analysisFunction: this.analyzeLinguistics.bind(this)
            },
            'timeline-mapper': {
                name: 'Timeline Mapper',
                emoji: '🕰️',
                description: 'Maps conversation chronology and timing patterns to identify anomalies.',
                uses: 'Detects unusual timing, conversation gaps, and reply patterns',
                analysisFunction: this.analyzeTimeline.bind(this)
            },
            'domain-researcher': {
                name: 'Domain Researcher',
                emoji: '🌐',
                description: 'Investigates sender domains, registration dates, and reputation scores.',
                uses: 'Identifies newly registered domains, suspicious TLDs, and domain spoofing',
                analysisFunction: this.analyzeDomain.bind(this)
            },
            'pattern-detector': {
                name: 'Pattern Detector',
                emoji: '📊',
                description: 'Identifies recurring phishing tactics and attack patterns across email layers.',
                uses: 'Spots common attack vectors, template reuse, and campaign patterns',
                analysisFunction: this.analyzePatterns.bind(this)
            }
        };
    }

    // Excavation Sites System
    generateExcavationSites() {
        this.excavationSites = {
            'corporate-chain': {
                id: 'corporate-chain',
                name: 'Corporate Email Chain',
                icon: '🏢',
                difficulty: 'beginner',
                description: 'A seemingly routine corporate email thread containing hidden phishing attempts.',
                layers: 5,
                emails: [
                    // Layer 1 - Surface (legitimate)
                    {
                        layer: 1,
                        isLegitimate: true,
                        from: 'hr@company.com',
                        to: 'all-employees@company.com',
                        subject: 'Updated Company Policies - Please Review',
                        date: '2024-03-15 09:00:00',
                        messageId: '<policy-update-001@company.com>',
                        body: `Dear Team,

We have updated our employee handbook with new remote work policies and benefits information.

Please review the changes at your convenience. The updated handbook is available on our intranet portal.

Key updates include:
- New flexible work arrangements
- Updated health benefits
- Revised PTO policies

Best regards,
HR Department
Company Inc.`
                    },
                    // Layer 2 - Slightly suspicious reply
                    {
                        layer: 2,
                        isLegitimate: false,
                        threat: 'credential-harvesting',
                        from: 'it-support@company-update.net',
                        to: 'all-employees@company.com',
                        subject: 'RE: Updated Company Policies - Action Required',
                        date: '2024-03-15 11:30:00',
                        messageId: '<urgent-update-002@company-update.net>',
                        body: `Important Notice:

Due to the policy updates, all employees must verify their account access to continue using company systems.

Please click here to verify your credentials immediately:
https://company-update.net/verify-access

This verification must be completed by end of day to avoid account suspension.

IT Support Team
Company Inc.`
                    },
                    // Layer 3 - Follow-up pressure
                    {
                        layer: 3,
                        isLegitimate: false,
                        threat: 'urgency-tactics',
                        from: 'security-alert@company-updates.net',
                        to: 'all-employees@company.com',
                        subject: 'URGENT: Account Verification Deadline - 2 Hours Remaining',
                        date: '2024-03-15 14:45:00',
                        messageId: '<final-warning-003@company-updates.net>',
                        body: `IMMEDIATE ACTION REQUIRED

Your account verification is still pending. You have less than 2 hours to complete this process.

CLICK HERE NOW: https://company-updates.net/final-verify

Failure to verify will result in:
- Account suspension
- Loss of access to all company systems
- Potential disciplinary action

Do not reply to this message. Click the link immediately.

Security Team`
                    },
                    // Layer 4 - Impersonation attempt
                    {
                        layer: 4,
                        isLegitimate: false,
                        threat: 'ceo-impersonation',
                        from: 'ceo@company-inc.net',
                        to: 'finance@company.com',
                        subject: 'Confidential: Urgent Wire Transfer Required',
                        date: '2024-03-15 16:20:00',
                        messageId: '<confidential-004@company-inc.net>',
                        body: `Finance Team,

I'm currently in meetings with potential investors and need an urgent wire transfer processed.

Transfer Details:
Amount: $75,000
Account: 12345678901
Routing: 021000021
Recipient: Strategic Holdings LLC

This is time-sensitive for our acquisition talks. Please process immediately and confirm.

Do not discuss this with anyone else as it's confidential.

John Smith
CEO, Company Inc.`
                    },
                    // Layer 5 - Deep threat (sophisticated)
                    {
                        layer: 5,
                        isLegitimate: false,
                        threat: 'advanced-spear-phishing',
                        from: 'legal-dept@company.com',
                        to: 'john.doe@company.com',
                        subject: 'Legal Notice: Confidential Settlement Agreement',
                        date: '2024-03-15 17:45:00',
                        messageId: '<legal-settlement-005@company.com>',
                        body: `Mr. Doe,

Our legal department has received a settlement offer regarding the intellectual property dispute with TechCorp.

Please review the confidential settlement documents attached and provide your digital signature by tomorrow.

Document access: https://legal-docs.company-secure.net/settlement/view?token=abc123def456

This matter requires immediate attention as the offer expires at midnight.

Regards,
Sarah Johnson
Senior Legal Counsel
Company Inc.

CONFIDENTIAL: This communication is protected by attorney-client privilege.`
                    }
                ]
            },
            'bank-notification': {
                id: 'bank-notification',
                name: 'Banking Alert Thread',
                icon: '🏦',
                difficulty: 'intermediate',
                description: 'Progressive banking phishing attempts disguised as security notifications.',
                layers: 4,
                emails: [
                    {
                        layer: 1,
                        isLegitimate: true,
                        from: 'security@firstnationalbank.com',
                        to: 'customer@email.com',
                        subject: 'Security Enhancement: New Login Monitoring Active',
                        date: '2024-03-10 10:00:00',
                        messageId: '<security-enhancement-001@firstnationalbank.com>',
                        body: `Dear Valued Customer,

We have activated enhanced login monitoring on your account to better protect against unauthorized access.

This new security feature will:
- Monitor login locations
- Alert you to unusual activity
- Provide additional protection

No action is required from you. The system is now active and monitoring your account.

If you have questions, please visit our website or call customer service at (555) 123-4567.

First National Bank Security Team`
                    },
                    {
                        layer: 2,
                        isLegitimate: false,
                        threat: 'fake-security-alert',
                        from: 'security-alerts@firstnational-bank.com',
                        to: 'customer@email.com',
                        subject: 'Security Alert: Suspicious Activity Detected',
                        date: '2024-03-12 08:15:00',
                        messageId: '<suspicious-activity-002@firstnational-bank.com>',
                        body: `SECURITY ALERT

We have detected suspicious login attempts on your account from the following location:
- IP Address: 192.168.1.100 (Unknown Location)
- Time: March 11, 2024 at 11:47 PM
- Device: Unknown Mobile Device

If this was not you, please secure your account immediately:

SECURE ACCOUNT: https://firstnational-bank.com/secure-login

For your protection, we have temporarily limited account access until you verify your identity.

First National Bank Security`
                    },
                    {
                        layer: 3,
                        isLegitimate: false,
                        threat: 'account-takeover-attempt',
                        from: 'account-protection@firstnationalbank.net',
                        to: 'customer@email.com',
                        subject: 'URGENT: Account Compromise Prevention Required',
                        date: '2024-03-13 06:30:00',
                        messageId: '<account-protection-003@firstnationalbank.net>',
                        body: `ACCOUNT SECURITY BREACH DETECTED

Multiple unauthorized access attempts have been made on your account. 

Immediate action required to prevent account takeover:

1. Verify your identity: https://account-protection.firstnationalbank.net/verify
2. Update your security information
3. Review recent transactions

WARNING: Delaying this process may result in:
- Unauthorized transactions
- Complete account lockout
- Identity theft

Complete verification within 6 hours to maintain account access.

Emergency Contact: 1-800-BANK-911`
                    },
                    {
                        layer: 4,
                        isLegitimate: false,
                        threat: 'sophisticated-clone',
                        from: 'noreply@firstnationalbank.com',
                        to: 'customer@email.com',
                        subject: 'Account Verification Complete - Review Changes',
                        date: '2024-03-14 12:00:00',
                        messageId: '<verification-complete-004@firstnationalbank.com>',
                        body: `Account Verification Successful

Thank you for completing the security verification process. Your account protection has been enhanced.

Recent Security Changes:
✓ Password updated
✓ Security questions changed
✓ Contact information verified
✓ Mobile alerts activated

Account Summary:
Available Balance: $2,847.32
Last Login: March 14, 2024 11:58 AM

If you did not make these changes, please contact us immediately at the number below.

For security reasons, please verify these changes by logging in:
https://secure.firstnationalbank.com/verify-changes

Customer Service: (555) 123-4567
First National Bank`
                    }
                ]
            },
            'academic-research': {
                id: 'academic-research',
                name: 'Academic Research Collaboration',
                icon: '🎓',
                difficulty: 'advanced',
                description: 'Sophisticated spear-phishing targeting academic researchers with grant and collaboration offers.',
                layers: 6,
                emails: [
                    {
                        layer: 1,
                        isLegitimate: true,
                        from: 'grants-office@university.edu',
                        to: 'researchers@university.edu',
                        subject: 'New Grant Opportunities - Deadline Reminder',
                        date: '2024-02-20 14:00:00',
                        messageId: '<grant-opportunities-001@university.edu>',
                        body: `Dear Researchers,

The following grant opportunities have upcoming deadlines:

NSF Research Grant - Deadline: March 15, 2024
NIH Innovation Award - Deadline: March 30, 2024
DOE Sustainability Grant - Deadline: April 10, 2024

Application materials and guidelines are available on the grants portal. Please reach out if you need assistance with your applications.

Best regards,
University Grants Office`
                    },
                    {
                        layer: 2,
                        isLegitimate: false,
                        threat: 'fake-collaboration',
                        from: 'collaboration@international-research.org',
                        to: 'dr.smith@university.edu',
                        subject: 'International Research Collaboration Opportunity',
                        date: '2024-02-25 09:30:00',
                        messageId: '<collaboration-invite-002@international-research.org>',
                        body: `Dear Dr. Smith,

I am Dr. Elena Petrov from the International Research Institute. I came across your published work on renewable energy systems and am impressed by your findings.

We are seeking collaboration partners for a €2.5M EU-funded research project on sustainable technologies. Your expertise would be invaluable to our consortium.

Project Details:
- Duration: 3 years
- Your institution's share: €450,000
- Start date: September 2024

I would like to schedule a video call to discuss this opportunity. Please review our preliminary proposal:

https://international-research.org/collaboration/proposals/view?id=RE-2024-445

Looking forward to working together.

Dr. Elena Petrov
Senior Research Director
International Research Institute`
                    },
                    {
                        layer: 3,
                        isLegitimate: false,
                        threat: 'credential-harvesting',
                        from: 'portal-access@research-consortium.eu',
                        to: 'dr.smith@university.edu',
                        subject: 'Action Required: Consortium Portal Access Setup',
                        date: '2024-03-01 11:15:00',
                        messageId: '<portal-setup-003@research-consortium.eu>',
                        body: `Dear Dr. Smith,

Following your expression of interest in the EU research collaboration, you need to create your researcher profile in our consortium portal.

Portal Access Setup Required:
1. Create your secure researcher account
2. Upload your CV and research portfolio
3. Complete the collaboration agreement

Setup Link: https://research-consortium.eu/portal/researcher-setup

Please use your university credentials to maintain profile consistency. The system will sync with your institutional account for seamless access.

Portal setup must be completed within 48 hours to secure your position in the consortium.

Technical Support: portal-support@research-consortium.eu

Best regards,
Consortium Administration Team`
                    },
                    {
                        layer: 4,
                        isLegitimate: false,
                        threat: 'document-harvesting',
                        from: 'legal@research-partners.org',
                        to: 'dr.smith@university.edu',
                        subject: 'Confidential: Collaboration Agreement for Digital Signature',
                        date: '2024-03-05 15:45:00',
                        messageId: '<legal-agreement-004@research-partners.org>',
                        body: `Dr. Smith,

The legal team has finalized your collaboration agreement for the EU research project. The document requires your digital signature to proceed.

Agreement Summary:
- Project: Sustainable Energy Systems Research
- Duration: 36 months
- Funding: €450,000 to University
- IP Rights: Shared ownership model

Please review and sign the agreement using our secure document portal:

https://legal-docs.research-partners.org/sign-agreement?token=eu-collab-2024-smith

Required Information for Processing:
- Full legal name as it appears on your ID
- University employment verification
- Bank details for funding transfer

The agreement expires in 72 hours if not signed. Please prioritize this to secure your research funding.

Legal Department
European Research Partners Consortium`
                    },
                    {
                        layer: 5,
                        isLegitimate: false,
                        threat: 'advanced-impersonation',
                        from: 'finance@university.edu',
                        to: 'accounting@university.edu',
                        subject: 'Wire Transfer Authorization - EU Research Grant',
                        date: '2024-03-08 13:20:00',
                        messageId: '<wire-transfer-005@university.edu>',
                        body: `Accounting Department,

Dr. Smith has secured a significant EU research grant and needs immediate wire transfer setup for the advance payment.

Grant Details:
- Project: Sustainable Energy Consortium  
- Grant Amount: €450,000
- Advance Payment: €75,000 (Due March 10)

Wire Transfer Details:
Account Name: EU Research Advance Processing
Account Number: 4458-7721-9934-5567
SWIFT Code: EURORESBANK
Bank: European Research Finance Bank

Please process this wire transfer immediately as the funding deadline is approaching. Dr. Smith is in meetings with EU officials and has authorized this transfer.

Contact Dr. Smith directly at his mobile: +1-555-FAKE for confirmation if needed.

University Finance Office`
                    },
                    {
                        layer: 6,
                        isLegitimate: false,
                        threat: 'supply-chain-attack',
                        from: 'it-security@university.edu',
                        to: 'all-researchers@university.edu',
                        subject: 'Critical: Research Data Security Upgrade Required',
                        date: '2024-03-10 08:00:00',
                        messageId: '<security-upgrade-006@university.edu>',
                        body: `CRITICAL SECURITY UPDATE

Following recent cybersecurity incidents at peer institutions, all researchers must immediately update their data security protocols.

Required Actions:
1. Install enhanced security software
2. Update all research data encryption
3. Verify cloud storage security settings

Download the university-approved security toolkit:
https://secure-research.university.edu/security-toolkit/download

Installation Instructions:
- Run as administrator
- Use your university credentials when prompted
- Allow the software to scan and encrypt existing research data
- Restart your computer after installation

This update is mandatory for all researchers handling sensitive data. IT support will verify compliance by March 15.

Non-compliance may result in:
- Loss of research data access
- Suspension of grant funding
- Disciplinary action

Contact IT Security: security@university.edu

University IT Security Team`
                    }
                ]
            }
        };
    }

    // Artifact Types System  
    generateArtifactTypes() {
        this.artifactTypes = {
            'spoofed-identity': {
                name: 'Spoofed Identity',
                icon: '🎭',
                description: 'Evidence of sender impersonation or identity theft attempts.',
                rarity: 'common'
            },
            'malicious-link': {
                name: 'Malicious Link',
                icon: '🔗',
                description: 'Dangerous URLs designed to steal credentials or install malware.',
                rarity: 'common'
            },
            'dangerous-attachment': {
                name: 'Dangerous Attachment',
                icon: '📎',
                description: 'Potentially infected files or documents with malicious payloads.',
                rarity: 'common'
            },
            'social-engineering': {
                name: 'Social Engineering',
                icon: '💰',
                description: 'Psychological manipulation tactics used to influence victims.',
                rarity: 'uncommon'
            },
            'urgency-tactics': {
                name: 'Urgency Tactics',
                icon: '⚡',
                description: 'Artificial deadlines and pressure techniques to rush decisions.',
                rarity: 'common'
            },
            'credential-harvesting': {
                name: 'Credential Harvesting',
                icon: '🎣',
                description: 'Attempts to steal usernames, passwords, and authentication data.',
                rarity: 'uncommon'
            },
            'ceo-fraud': {
                name: 'CEO Fraud',
                icon: '👔',
                description: 'Executive impersonation for financial fraud (Business Email Compromise).',
                rarity: 'rare'
            },
            'advanced-persistent': {
                name: 'Advanced Persistent Threat',
                icon: '🕷️',
                description: 'Sophisticated, multi-stage attack campaigns with specific targets.',
                rarity: 'rare'
            },
            'supply-chain-attack': {
                name: 'Supply Chain Attack',
                icon: '🔄',
                description: 'Attacks targeting trusted third-party vendors or service providers.',
                rarity: 'epic'
            }
        };
    }

    // UI Updates
    updateMainMenuStats() {
        document.getElementById('experience-level').textContent = this.gameState.experienceLevel;
        document.getElementById('artifacts-found').textContent = this.gameState.artifactsFound;
        document.getElementById('sites-excavated').textContent = this.gameState.sitesExcavated;
    }

    updateExperienceLevel() {
        const artifacts = this.gameState.artifactsFound;
        if (artifacts >= 25) this.gameState.experienceLevel = 'Master Archaeologist';
        else if (artifacts >= 20) this.gameState.experienceLevel = 'Expert Digger';
        else if (artifacts >= 15) this.gameState.experienceLevel = 'Senior Researcher';
        else if (artifacts >= 10) this.gameState.experienceLevel = 'Experienced Analyst';
        else if (artifacts >= 5) this.gameState.experienceLevel = 'Junior Investigator';
        else this.gameState.experienceLevel = 'Novice Digger';
    }

    // Tools Display
    showTools() {
        this.displayToolsCatalog();
        this.showScreen('tools-guide');
    }

    displayToolsCatalog() {
        const catalog = document.getElementById('tools-catalog');
        catalog.innerHTML = '';

        Object.keys(this.forensicsTools).forEach(toolKey => {
            const tool = this.forensicsTools[toolKey];
            const toolCard = document.createElement('div');
            toolCard.className = 'tool-info-card';
            
            toolCard.innerHTML = `
                <div class="tool-header">
                    <div class="tool-icon">${tool.emoji}</div>
                    <div class="tool-name">${tool.name}</div>
                </div>
                <div class="tool-description">${tool.description}</div>
                <div class="tool-uses">
                    <strong>Best used for:</strong> ${tool.uses}
                </div>
            `;
            
            catalog.appendChild(toolCard);
        });
    }

    // Artifacts Display
    showArtifacts() {
        this.displayArtifactsCollection();
        this.showScreen('artifacts-collection');
    }

    displayArtifactsCollection() {
        const artifactsDisplay = document.getElementById('artifacts-display');
        
        if (this.gameState.unlockedArtifacts.length === 0) {
            artifactsDisplay.innerHTML = `
                <div class="empty-artifacts">
                    <h3>🏺 No Artifacts Discovered Yet</h3>
                    <p>Begin excavating email sites to uncover digital artifacts and evidence of phishing attempts.</p>
                </div>
            `;
            return;
        }
        
        artifactsDisplay.innerHTML = '';
        
        this.gameState.unlockedArtifacts.forEach(artifact => {
            const artifactType = this.artifactTypes[artifact.type];
            const artifactCard = document.createElement('div');
            artifactCard.className = 'artifact-card';
            
            artifactCard.innerHTML = `
                <div class="artifact-header">
                    <div class="artifact-icon">${artifactType.icon}</div>
                    <div class="artifact-name">${artifactType.name}</div>
                </div>
                <div class="artifact-description">${artifactType.description}</div>
                <div class="artifact-discovered">Discovered at: ${artifact.site} - Layer ${artifact.layer}</div>
                <div class="artifact-evidence">${artifact.evidence}</div>
            `;
            
            artifactsDisplay.appendChild(artifactCard);
        });
    }

    // Site Selection and Management
    showSiteSelection() {
        this.displayExcavationSites();
        this.showScreen('site-selection');
    }

    displayExcavationSites() {
        const sitesGrid = document.getElementById('sites-grid');
        sitesGrid.innerHTML = '';

        Object.keys(this.excavationSites).forEach(siteKey => {
            const site = this.excavationSites[siteKey];
            const isCompleted = this.gameState.completedSites.includes(site.id);
            
            const siteCard = document.createElement('div');
            siteCard.className = `site-card ${isCompleted ? 'completed' : ''}`;
            siteCard.onclick = () => this.selectSite(site);
            
            // Create layer indicators
            const layerIndicators = Array.from({length: site.layers}, (_, i) => {
                const layerCompleted = isCompleted || (this.gameState.currentSite?.id === site.id && i < this.gameState.currentLayer - 1);
                return `<div class="layer-dot ${layerCompleted ? 'completed' : ''}"></div>`;
            }).join('');
            
            siteCard.innerHTML = `
                <div class="site-header-info">
                    <div class="site-icon">${site.icon}</div>
                    <div>
                        <div class="site-title">${site.name}</div>
                        <span class="site-difficulty ${site.difficulty}">${site.difficulty}</span>
                    </div>
                </div>
                <div class="site-description">${site.description}</div>
                <div class="site-layers">
                    <span>Layers to excavate:</span>
                    <div class="layers-indicator">${layerIndicators}</div>
                </div>
                ${isCompleted ? '<div class="completion-badge">✅ Fully Excavated</div>' : ''}
            `;
            
            sitesGrid.appendChild(siteCard);
        });
    }

    selectSite(site) {
        this.gameState.currentSite = site;
        this.gameState.currentLayer = 1;
        this.gameState.discoveries = [];
        this.startExcavation();
    }

    // Excavation Process
    startExcavation() {
        this.displayCurrentLayer();
        this.setupExcavationTools();
        this.showScreen('excavation-site');
    }

    displayCurrentLayer() {
        const site = this.gameState.currentSite;
        const currentEmail = site.emails.find(email => email.layer === this.gameState.currentLayer);
        
        // Update site info
        document.getElementById('site-name').textContent = site.name;
        document.getElementById('site-description').textContent = site.description;
        document.getElementById('current-layer').textContent = this.gameState.currentLayer;
        document.getElementById('total-layers').textContent = site.layers;
        
        // Update progress
        const progress = (this.gameState.currentLayer / site.layers) * 100;
        document.getElementById('depth-progress').style.width = `${progress}%`;
        
        // Display email
        if (currentEmail) {
            this.displayEmail(currentEmail);
        }
        
        // Update excavate button
        const excavateBtn = document.getElementById('excavate-btn');
        if (this.gameState.currentLayer >= site.layers) {
            excavateBtn.textContent = '📝 DOCUMENT FINDINGS';
            excavateBtn.onclick = () => this.completeSiteExcavation();
        } else {
            excavateBtn.textContent = '🏗️ EXCAVATE DEEPER';
            excavateBtn.onclick = () => this.excavateLayer();
        }
    }

    displayEmail(email) {
        const emailContainer = document.getElementById('email-display');
        
        emailContainer.innerHTML = `
            <div class="email-header">
                <div class="email-header-line">
                    <span class="header-label">From:</span>
                    <span class="header-value">${email.from}</span>
                </div>
                <div class="email-header-line">
                    <span class="header-label">To:</span>
                    <span class="header-value">${email.to}</span>
                </div>
                <div class="email-header-line">
                    <span class="header-label">Subject:</span>
                    <span class="header-value">${email.subject}</span>
                </div>
                <div class="email-header-line">
                    <span class="header-label">Date:</span>
                    <span class="header-value">${email.date}</span>
                </div>
                <div class="email-header-line">
                    <span class="header-label">Message-ID:</span>
                    <span class="header-value">${email.messageId}</span>
                </div>
            </div>
            <div class="email-body">${this.highlightSuspiciousContent(email.body, email.isLegitimate)}</div>
        `;
    }

    highlightSuspiciousContent(body, isLegitimate) {
        if (isLegitimate) return body;
        
        // Highlight suspicious patterns
        let highlightedBody = body;
        
        // Highlight urgency words
        const urgencyWords = /(urgent|immediate|quickly|now|asap|deadline|expires|limited time|act fast)/gi;
        highlightedBody = highlightedBody.replace(urgencyWords, '<span class="suspicious-text">$1</span>');
        
        // Highlight suspicious links
        const linkPattern = /(https?:\/\/[^\s]+)/gi;
        highlightedBody = highlightedBody.replace(linkPattern, '<span class="threat-text">$1</span>');
        
        // Highlight requests for information
        const infoRequests = /(password|username|social security|bank account|credit card|verify|confirm|update)/gi;
        highlightedBody = highlightedBody.replace(infoRequests, '<span class="threat-text">$1</span>');
        
        return highlightedBody;
    }

    setupExcavationTools() {
        const toolsGrid = document.getElementById('available-tools');
        toolsGrid.innerHTML = '';
        
        Object.keys(this.forensicsTools).forEach(toolKey => {
            const tool = this.forensicsTools[toolKey];
            const toolButton = document.createElement('div');
            toolButton.className = 'tool-button';
            toolButton.onclick = () => this.useTool(toolKey, tool);
            
            toolButton.innerHTML = `
                <span class="tool-emoji">${tool.emoji}</span>
                <span class="tool-name-short">${tool.name}</span>
            `;
            
            toolsGrid.appendChild(toolButton);
        });
        
        // Clear analysis results
        document.getElementById('results-content').innerHTML = '<p>Select a tool to begin analysis...</p>';
        
        // Update discoveries log
        this.updateDiscoveriesLog();
    }

    useTool(toolKey, tool) {
        const site = this.gameState.currentSite;
        const currentEmail = site.emails.find(email => email.layer === this.gameState.currentLayer);
        
        if (!currentEmail) return;
        
        // Perform analysis
        const analysisResult = tool.analysisFunction(currentEmail);
        
        // Show analysis modal
        this.showAnalysisModal(tool.name, analysisResult, currentEmail);
    }

    showAnalysisModal(toolName, analysisResult, email) {
        const modal = document.getElementById('analysis-modal');
        document.getElementById('modal-title').textContent = `🔍 ${toolName} Analysis`;
        document.getElementById('tool-analysis-content').innerHTML = analysisResult.content;
        
        // Store current analysis for actions
        this.currentAnalysis = { result: analysisResult, email: email };
        
        modal.classList.add('active');
    }

    closeAnalysisModal() {
        document.getElementById('analysis-modal').classList.remove('active');
    }

    // Tool Analysis Functions
    analyzeHeaders(email) {
        const analysis = {
            content: '',
            threats: [],
            findings: []
        };
        
        if (!email.isLegitimate) {
            switch (email.threat) {
                case 'credential-harvesting':
                case 'fake-security-alert':
                case 'account-takeover-attempt':
                    analysis.content = `
                        <div class="analysis-section">
                            <h4>🔍 Header Analysis Results</h4>
                            <p><strong>Sender Authentication:</strong> FAILED</p>
                            <p><strong>SPF Record:</strong> Not found for sending domain</p>
                            <p><strong>DKIM Signature:</strong> Invalid or missing</p>
                            <p><strong>Domain Mismatch:</strong> Sending domain differs from claimed organization</p>
                        </div>
                        <div class="analysis-section">
                            <h4>⚠️ Red Flags Detected</h4>
                            <ul>
                                <li>Domain spoofing attempt detected</li>
                                <li>Missing or invalid authentication records</li>
                                <li>Suspicious routing path through unknown servers</li>
                            </ul>
                        </div>
                    `;
                    analysis.threats.push('spoofed-identity');
                    break;
                default:
                    analysis.content = `
                        <div class="analysis-section">
                            <h4>🔍 Header Analysis Results</h4>
                            <p><strong>Sender Authentication:</strong> SUSPICIOUS</p>
                            <p>Headers show potential inconsistencies that warrant further investigation.</p>
                        </div>
                    `;
                    analysis.threats.push('spoofed-identity');
            }
        } else {
            analysis.content = `
                <div class="analysis-section">
                    <h4>🔍 Header Analysis Results</h4>
                    <p><strong>Sender Authentication:</strong> PASSED</p>
                    <p><strong>SPF Record:</strong> Valid</p>
                    <p><strong>DKIM Signature:</strong> Valid</p>
                    <p>Headers appear legitimate with proper authentication.</p>
                </div>
            `;
        }
        
        return analysis;
    }

    analyzeLinks(email) {
        const analysis = {
            content: '',
            threats: [],
            findings: []
        };
        
        const linkMatches = email.body.match(/(https?:\/\/[^\s]+)/gi);
        
        if (linkMatches && !email.isLegitimate) {
            analysis.content = `
                <div class="analysis-section">
                    <h4>🔗 Link Analysis Results</h4>
                    <p><strong>Links Found:</strong> ${linkMatches.length}</p>
                    <ul>
                        ${linkMatches.map(link => `<li><strong>SUSPICIOUS:</strong> ${link}</li>`).join('')}
                    </ul>
                </div>
                <div class="analysis-section">
                    <h4>⚠️ Security Risks</h4>
                    <ul>
                        <li>Domain does not match legitimate organization</li>
                        <li>Links may redirect to malicious sites</li>
                        <li>Potential credential harvesting destination</li>
                    </ul>
                </div>
            `;
            analysis.threats.push('malicious-link');
        } else if (linkMatches) {
            analysis.content = `
                <div class="analysis-section">
                    <h4>🔗 Link Analysis Results</h4>
                    <p><strong>Links Found:</strong> ${linkMatches.length}</p>
                    <p>All links appear to point to legitimate domains.</p>
                </div>
            `;
        } else {
            analysis.content = `
                <div class="analysis-section">
                    <h4>🔗 Link Analysis Results</h4>
                    <p>No links detected in this email.</p>
                </div>
            `;
        }
        
        return analysis;
    }

    analyzeLinguistics(email) {
        const analysis = {
            content: '',
            threats: [],
            findings: []
        };
        
        if (!email.isLegitimate) {
            const urgencyWords = email.body.match(/(urgent|immediate|quickly|now|asap|deadline|expires|limited time|act fast)/gi) || [];
            const threatWords = email.body.match(/(suspend|close|terminate|delete|remove|block)/gi) || [];
            const actionWords = email.body.match(/(click|verify|confirm|update|download|install)/gi) || [];
            
            analysis.content = `
                <div class="analysis-section">
                    <h4>📝 Linguistic Analysis Results</h4>
                    <p><strong>Urgency Indicators:</strong> ${urgencyWords.length} found</p>
                    <p><strong>Threat Language:</strong> ${threatWords.length} found</p>
                    <p><strong>Action Requests:</strong> ${actionWords.length} found</p>
                </div>
                <div class="analysis-section">
                    <h4>⚠️ Social Engineering Tactics</h4>
                    <ul>
                        <li>High-pressure language designed to rush decisions</li>
                        <li>Fear-based messaging about consequences</li>
                        <li>Requests for immediate action</li>
                    </ul>
                </div>
            `;
            
            if (urgencyWords.length > 0) analysis.threats.push('urgency-tactics');
            if (actionWords.length > 0) analysis.threats.push('social-engineering');
        } else {
            analysis.content = `
                <div class="analysis-section">
                    <h4>📝 Linguistic Analysis Results</h4>
                    <p>Language patterns appear professional and legitimate.</p>
                    <p>No aggressive urgency tactics or manipulation detected.</p>
                </div>
            `;
        }
        
        return analysis;
    }

    analyzeTimeline(email) {
        const analysis = {
            content: '',
            threats: [],
            findings: []
        };
        
        const emailDate = new Date(email.date);
        const now = new Date();
        const hoursDiff = (now - emailDate) / (1000 * 60 * 60);
        
        analysis.content = `
            <div class="analysis-section">
                <h4>🕰️ Timeline Analysis Results</h4>
                <p><strong>Email Timestamp:</strong> ${email.date}</p>
                <p><strong>Time Since Sent:</strong> ${Math.round(hoursDiff)} hours ago</p>
                <p><strong>Send Time:</strong> ${emailDate.getHours()}:${emailDate.getMinutes().toString().padStart(2, '0')}</p>
            </div>
        `;
        
        if (!email.isLegitimate) {
            if (emailDate.getHours() < 6 || emailDate.getHours() > 22) {
                analysis.content += `
                    <div class="analysis-section">
                        <h4>⚠️ Timing Anomalies</h4>
                        <p>Email sent outside normal business hours, which is suspicious for official communications.</p>
                    </div>
                `;
            }
        }
        
        return analysis;
    }

    analyzeDomain(email) {
        const analysis = {
            content: '',
            threats: [],
            findings: []
        };
        
        const fromDomain = email.from.split('@')[1];
        
        if (!email.isLegitimate) {
            analysis.content = `
                <div class="analysis-section">
                    <h4>🌐 Domain Analysis Results</h4>
                    <p><strong>Sender Domain:</strong> ${fromDomain}</p>
                    <p><strong>Domain Age:</strong> Recently registered (suspicious)</p>
                    <p><strong>Reputation Score:</strong> Poor (0.2/10)</p>
                    <p><strong>Registration Country:</strong> Unknown/Privacy Protected</p>
                </div>
                <div class="analysis-section">
                    <h4>⚠️ Domain Red Flags</h4>
                    <ul>
                        <li>Domain designed to mimic legitimate organization</li>
                        <li>No established web presence or business records</li>
                        <li>Registration privacy protection enabled</li>
                    </ul>
                </div>
            `;
            analysis.threats.push('spoofed-identity');
        } else {
            analysis.content = `
                <div class="analysis-section">
                    <h4>🌐 Domain Analysis Results</h4>
                    <p><strong>Sender Domain:</strong> ${fromDomain}</p>
                    <p><strong>Domain Age:</strong> Established (5+ years)</p>
                    <p><strong>Reputation Score:</strong> Excellent (9.5/10)</p>
                    <p>Domain has legitimate business presence and good reputation.</p>
                </div>
            `;
        }
        
        return analysis;
    }

    analyzePatterns(email) {
        const analysis = {
            content: '',
            threats: [],
            findings: []
        };
        
        if (!email.isLegitimate) {
            let patternType = 'Generic Phishing';
            
            switch (email.threat) {
                case 'ceo-impersonation':
                    patternType = 'Business Email Compromise (BEC)';
                    break;
                case 'credential-harvesting':
                    patternType = 'Credential Harvesting Campaign';
                    break;
                case 'advanced-spear-phishing':
                    patternType = 'Spear Phishing Attack';
                    break;
                case 'fake-security-alert':
                    patternType = 'Security Alert Impersonation';
                    break;
            }
            
            analysis.content = `
                <div class="analysis-section">
                    <h4>📊 Pattern Analysis Results</h4>
                    <p><strong>Attack Pattern:</strong> ${patternType}</p>
                    <p><strong>Campaign Indicators:</strong> Matches known attack templates</p>
                    <p><strong>Target Profile:</strong> ${this.getTargetProfile(email.threat)}</p>
                </div>
                <div class="analysis-section">
                    <h4>⚠️ Campaign Characteristics</h4>
                    <ul>
                        <li>Part of a larger coordinated attack campaign</li>
                        <li>Uses social engineering and urgency tactics</li>
                        <li>Targets specific user behaviors and responses</li>
                    </ul>
                </div>
            `;
            
            analysis.threats.push(this.getThreatTypeFromEmail(email.threat));
        } else {
            analysis.content = `
                <div class="analysis-section">
                    <h4>📊 Pattern Analysis Results</h4>
                    <p>No malicious patterns detected in this email.</p>
                    <p>Communication follows legitimate business email patterns.</p>
                </div>
            `;
        }
        
        return analysis;
    }

    getTargetProfile(threat) {
        const profiles = {
            'ceo-impersonation': 'Finance and accounting personnel',
            'credential-harvesting': 'General employee population',
            'advanced-spear-phishing': 'High-value targets with access to sensitive data',
            'fake-security-alert': 'Security-conscious users',
            'account-takeover-attempt': 'Online banking customers',
            'urgency-tactics': 'Time-pressured workers'
        };
        return profiles[threat] || 'General population';
    }

    getThreatTypeFromEmail(threat) {
        const mapping = {
            'ceo-impersonation': 'ceo-fraud',
            'credential-harvesting': 'credential-harvesting',
            'advanced-spear-phishing': 'advanced-persistent',
            'fake-security-alert': 'social-engineering',
            'account-takeover-attempt': 'credential-harvesting',
            'urgency-tactics': 'urgency-tactics'
        };
        return mapping[threat] || 'social-engineering';
    }

    // Discovery and Flagging
    flagThreat() {
        const analysis = this.currentAnalysis;
        if (!analysis) return;
        
        const email = analysis.email;
        const threats = analysis.result.threats;
        
        if (!email.isLegitimate && threats.length > 0) {
            // Correct identification
            threats.forEach(threatType => {
                const discovery = {
                    layer: this.gameState.currentLayer,
                    type: 'threat',
                    threatType: threatType,
                    description: `Correctly identified ${this.artifactTypes[threatType]?.name || threatType} in layer ${this.gameState.currentLayer}`,
                    isCorrect: true
                };
                this.gameState.discoveries.push(discovery);
                
                // Add to artifacts if not already found
                if (!this.gameState.unlockedArtifacts.find(a => a.type === threatType && a.site === this.gameState.currentSite.name)) {
                    this.gameState.unlockedArtifacts.push({
                        type: threatType,
                        site: this.gameState.currentSite.name,
                        layer: this.gameState.currentLayer,
                        evidence: email.subject,
                        discoveredAt: new Date().toISOString()
                    });
                    this.gameState.artifactsFound++;
                }
            });
        } else if (email.isLegitimate) {
            // False positive
            const discovery = {
                layer: this.gameState.currentLayer,
                type: 'false-positive',
                description: `Incorrectly flagged legitimate email in layer ${this.gameState.currentLayer}`,
                isCorrect: false
            };
            this.gameState.discoveries.push(discovery);
        } else {
            // Correct but no specific threats identified by tool
            const discovery = {
                layer: this.gameState.currentLayer,
                type: 'threat',
                threatType: 'general-phishing',
                description: `Correctly identified phishing attempt in layer ${this.gameState.currentLayer}`,
                isCorrect: true
            };
            this.gameState.discoveries.push(discovery);
        }
        
        this.updateDiscoveriesLog();
        this.closeAnalysisModal();
    }

    markSafe() {
        const analysis = this.currentAnalysis;
        if (!analysis) return;
        
        const email = analysis.email;
        
        if (email.isLegitimate) {
            // Correct identification
            const discovery = {
                layer: this.gameState.currentLayer,
                type: 'safe',
                description: `Correctly identified legitimate email in layer ${this.gameState.currentLayer}`,
                isCorrect: true
            };
            this.gameState.discoveries.push(discovery);
        } else {
            // False negative - missed threat
            const discovery = {
                layer: this.gameState.currentLayer,
                type: 'false-negative',
                description: `Missed threat in layer ${this.gameState.currentLayer} - marked as safe incorrectly`,
                isCorrect: false
            };
            this.gameState.discoveries.push(discovery);
        }
        
        this.updateDiscoveriesLog();
        this.closeAnalysisModal();
    }

    updateDiscoveriesLog() {
        const logDiv = document.getElementById('discoveries-log');
        
        if (this.gameState.discoveries.length === 0) {
            logDiv.innerHTML = '<p>No discoveries yet. Use your tools to analyze the email layers.</p>';
            document.getElementById('document-findings').disabled = true;
            return;
        }
        
        logDiv.innerHTML = '';
        this.gameState.discoveries.forEach(discovery => {
            const discoveryDiv = document.createElement('div');
            discoveryDiv.className = `discovery-item ${discovery.isCorrect ? 'safe' : ''}`;
            
            let icon = discovery.isCorrect ? '✅' : '❌';
            if (discovery.type === 'threat') icon = '🚨';
            
            discoveryDiv.innerHTML = `
                <strong>${icon} Layer ${discovery.layer}:</strong> ${discovery.description}
            `;
            
            logDiv.appendChild(discoveryDiv);
        });
        
        // Enable document findings if we have discoveries
        document.getElementById('document-findings').disabled = false;
    }

    // Layer Navigation
    excavateLayer() {
        if (this.gameState.currentLayer < this.gameState.currentSite.layers) {
            this.gameState.currentLayer++;
            this.displayCurrentLayer();
        }
    }

    documentFindings() {
        // This could open a modal to document findings or just proceed to complete
        this.completeSiteExcavation();
    }

    completeSiteExcavation() {
        // Mark site as completed
        if (!this.gameState.completedSites.includes(this.gameState.currentSite.id)) {
            this.gameState.completedSites.push(this.gameState.currentSite.id);
            this.gameState.sitesExcavated++;
        }
        
        // Update experience level
        this.updateExperienceLevel();
        
        // Generate completion report
        this.generateCompletionReport();
        
        // Save progress
        this.saveGameState();
        
        // Show completion screen
        this.showScreen('site-completion');
    }

    generateCompletionReport() {
        const correctDiscoveries = this.gameState.discoveries.filter(d => d.isCorrect).length;
        const totalDiscoveries = this.gameState.discoveries.length;
        const accuracy = totalDiscoveries > 0 ? Math.round((correctDiscoveries / totalDiscoveries) * 100) : 0;
        
        // Update completion title
        const titleElement = document.getElementById('completion-title');
        if (accuracy >= 80) titleElement.textContent = '🏆 EXCELLENT EXCAVATION!';
        else if (accuracy >= 60) titleElement.textContent = '⭐ GOOD ARCHAEOLOGICAL WORK!';
        else titleElement.textContent = '📚 LEARNING EXPERIENCE!';
        
        // Update summary stats
        const summaryGrid = document.getElementById('site-summary');
        summaryGrid.innerHTML = `
            <div class="summary-item">
                <span class="summary-value">${this.gameState.currentSite.layers}</span>
                <span class="summary-label">Layers Excavated</span>
            </div>
            <div class="summary-item">
                <span class="summary-value">${correctDiscoveries}</span>
                <span class="summary-label">Correct Discoveries</span>
            </div>
            <div class="summary-item">
                <span class="summary-value">${accuracy}%</span>
                <span class="summary-label">Accuracy Rate</span>
            </div>
            <div class="summary-item">
                <span class="summary-value">${this.gameState.discoveries.filter(d => d.type === 'threat').length}</span>
                <span class="summary-label">Threats Identified</span>
            </div>
        `;
        
        // Display new artifacts
        const newArtifacts = this.gameState.unlockedArtifacts.filter(a => a.site === this.gameState.currentSite.name);
        const artifactsGrid = document.getElementById('new-artifacts');
        
        if (newArtifacts.length > 0) {
            artifactsGrid.innerHTML = newArtifacts.map(artifact => {
                const artifactType = this.artifactTypes[artifact.type];
                return `
                    <div class="new-artifact">
                        <div class="new-artifact-icon">${artifactType.icon}</div>
                        <div class="new-artifact-name">${artifactType.name}</div>
                    </div>
                `;
            }).join('');
        } else {
            artifactsGrid.innerHTML = '<p>No new artifacts discovered at this site.</p>';
        }
        
        // Generate excavation report
        const reportText = document.getElementById('excavation-report');
        let report = `Excavation of ${this.gameState.currentSite.name} has been completed. `;
        
        if (accuracy >= 80) {
            report += 'Your forensic analysis was highly accurate, correctly identifying most threats while avoiding false positives. ';
        } else if (accuracy >= 60) {
            report += 'Your analysis showed good understanding of phishing tactics, with room for improvement in accuracy. ';
        } else {
            report += 'This excavation provided valuable learning opportunities. Consider reviewing the forensics tools and their applications. ';
        }
        
        const threatCount = this.gameState.discoveries.filter(d => d.type === 'threat' && d.isCorrect).length;
        if (threatCount > 0) {
            report += `You successfully identified ${threatCount} distinct phishing threats buried in the email layers. `;
        }
        
        const falsePositives = this.gameState.discoveries.filter(d => d.type === 'false-positive').length;
        if (falsePositives > 0) {
            report += `Note: ${falsePositives} false positive(s) were recorded, which could impact response effectiveness in real scenarios. `;
        }
        
        report += 'Continue excavating other sites to build your expertise in digital forensics and phishing detection.';
        
        reportText.textContent = report;
    }
}

// Global Game Instance
let game;

// Global Functions (called by HTML)
function showMainMenu() {
    game.showScreen('main-menu');
    game.updateMainMenuStats();
}

function showSiteSelection() {
    game.showSiteSelection();
}

function showArtifacts() {
    game.showArtifacts();
}

function showTools() {
    game.showTools();
}

function showInstructions() {
    game.showScreen('instructions');
}

function excavateLayer() {
    game.excavateLayer();
}

function documentFindings() {
    game.documentFindings();
}

function closeAnalysisModal() {
    game.closeAnalysisModal();
}

function flagThreat() {
    game.flagThreat();
}

function markSafe() {
    game.markSafe();
}

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', function() {
    game = new EmailArchaeologyDig();
});