// Time Travel Phishing Hunter - Game Data

// Era Definitions
const ERAS = {
    'early-internet': {
        id: 'early-internet',
        name: 'Early Internet Era',
        yearRange: '1995-2000',
        description: 'The dawn of consumer internet and basic email communication',
        theme: {
            primaryColor: '#00ff00',
            backgroundColor: '#001100',
            fontFamily: 'Courier Prime',
            className: 'era-early'
        },
        technology: [
            'Dial-up Internet',
            'Basic HTML Email',
            'Netscape Navigator',
            'AOL Instant Messenger',
            'Simple Web Pages',
            'Email Lists'
        ],
        commonPhishingTactics: [
            'Chain letters requesting personal info',
            'Fake lottery winnings',
            'Basic impersonation attempts',
            'Simple HTML formatting tricks'
        ],
        icon: '💻',
        unlocked: true
    },
    'dotcom-boom': {
        id: 'dotcom-boom',
        name: 'Dot-Com Boom Era',
        yearRange: '2000-2005',
        description: 'E-commerce explosion and early online banking',
        theme: {
            primaryColor: '#0066ff',
            backgroundColor: '#000033',
            fontFamily: 'Inter',
            className: 'era-dotcom'
        },
        technology: [
            'Broadband Internet',
            'Online Banking',
            'E-commerce Sites',
            'Enhanced HTML Email',
            'Early CSS Styling',
            'Web Forums'
        ],
        commonPhishingTactics: [
            'Nigerian prince scams',
            'Early phishing emails targeting banks',
            'Fake auction sites',
            'Investment opportunity scams'
        ],
        icon: '🌐',
        unlocked: false
    },
    'social-media': {
        id: 'social-media',
        name: 'Social Media Rise',
        yearRange: '2005-2010',
        description: 'Web 2.0 and the birth of social networking',
        theme: {
            primaryColor: '#4a90e2',
            backgroundColor: '#1a1a2e',
            fontFamily: 'Inter',
            className: 'era-social'
        },
        technology: [
            'Social Networks',
            'AJAX Web Apps',
            'Rich Media Email',
            'Instant Messaging',
            'Video Sharing',
            'Web 2.0 Design'
        ],
        commonPhishingTactics: [
            'Social media impersonation',
            'Friend recommendation scams',
            'Fake social media login pages',
            'Romance scams on dating platforms'
        ],
        icon: '👥',
        unlocked: false
    },
    'mobile-revolution': {
        id: 'mobile-revolution',
        name: 'Mobile Revolution',
        yearRange: '2010-2015',
        description: 'Smartphones and mobile internet dominance',
        theme: {
            primaryColor: '#ff6b35',
            backgroundColor: '#2c1810',
            fontFamily: 'Inter',
            className: 'era-mobile'
        },
        technology: [
            'Smartphones',
            'Mobile Apps',
            'Cloud Services',
            'Mobile Banking',
            'App Stores',
            'Social Media Apps'
        ],
        commonPhishingTactics: [
            'SMS phishing (smishing)',
            'Fake mobile app stores',
            'QR code attacks',
            'Mobile-optimized phishing sites'
        ],
        icon: '📱',
        unlocked: false
    },
    'ai-deepfakes': {
        id: 'ai-deepfakes',
        name: 'AI & Deepfakes Era',
        yearRange: '2020-Present',
        description: 'Artificial intelligence and sophisticated manipulation',
        theme: {
            primaryColor: '#8a2be2',
            backgroundColor: '#1a0d2e',
            fontFamily: 'Inter',
            className: 'era-ai'
        },
        technology: [
            'Machine Learning',
            'Deepfake Technology',
            'Cryptocurrency',
            'Advanced Spoofing',
            'AI Content Generation',
            'Biometric Authentication'
        ],
        commonPhishingTactics: [
            'Deepfake video calls',
            'AI-generated phishing content',
            'Cryptocurrency scams',
            'Supply chain attacks'
        ],
        icon: '🤖',
        unlocked: false
    },
    'future-threats': {
        id: 'future-threats',
        name: 'Future Threats',
        yearRange: '2025+',
        description: 'Next-generation cyber threats and countermeasures',
        theme: {
            primaryColor: '#00ffff',
            backgroundColor: '#0d1a1a',
            fontFamily: 'Orbitron',
            className: 'era-future'
        },
        technology: [
            'Neural Interfaces',
            'Quantum Computing',
            'IoT Ecosystem',
            'Holographic Displays',
            'Brain-Computer Interface',
            'Quantum Encryption'
        ],
        commonPhishingTactics: [
            'Neural interface hijacking',
            'IoT device impersonation',
            'Quantum-encrypted fake communications',
            'Biometric spoofing'
        ],
        icon: '🔮',
        unlocked: false
    }
};

// Phishing Scenarios Data
const SCENARIOS = {
    'early-internet': [
        {
            id: 'early-chain-letter',
            eraId: 'early-internet',
            title: 'The Lucky Chain Letter',
            difficulty: 'easy',
            type: 'email',
            content: {
                subject: 'FW: LUCKY CHAIN LETTER - MUST READ!!!',
                sender: 'goodluck@freemail.com',
                date: 'March 15, 1998 2:34 PM',
                body: `LUCKY CHAIN LETTER!!!

This chain letter has been around the world 13 times. You must send this to 10 people within 24 hours or you will have BAD LUCK for 7 years!!!

To receive your GOOD LUCK, you must also send me your:
- Full name
- Address  
- Phone number
- Social security number (for luck verification)

Send to: goodluck@freemail.com

DO NOT BREAK THE CHAIN!!! Forward this to 10 friends NOW!!!

This really works! My friend Sarah sent this and won $1000 the next day!

REMEMBER: 10 people in 24 hours or BAD LUCK FOREVER!`,
                attachments: [],
                links: ['mailto:goodluck@freemail.com']
            },
            redFlags: [
                'Requests personal information',
                'Uses fear tactics and superstition',
                'Claims of guaranteed results',
                'Pressure to forward immediately',
                'Asks for social security number',
                'Unprofessional email address'
            ],
            correctAnswer: 'phishing',
            explanation: 'This is a classic chain letter scam from the early internet era. The request for personal information, especially social security numbers, combined with superstitious threats makes this clearly fraudulent.',
            historicalContext: 'Chain letters were among the first widespread email scams, exploiting people\'s superstitions and the novelty of email communication. They often requested personal information under various pretenses.',
            points: 100
        },
        {
            id: 'early-lottery-win',
            eraId: 'early-internet',
            title: 'Instant Lottery Winner',
            difficulty: 'easy',
            type: 'email',
            content: {
                subject: 'CONGRATULATIONS! You won $50,000!!!',
                sender: 'lottery-winner@emailservice.net',
                date: 'August 3, 1999 11:22 AM',
                body: `Dear Internet User,

CONGRATULATIONS!!! You have been selected as a WINNER in our Internet Email Lottery!

Your email address was randomly selected from millions of users!

Prize Amount: $50,000 (FIFTY THOUSAND DOLLARS)
Winning Number: IEL-1999-7832
Reference Code: WIN/99/IEL/832

To claim your prize, please reply with:
1. Your full name
2. Your address
3. Your telephone number
4. Your bank account number (for prize transfer)
5. Copy of your driver's license

You must reply within 72 hours or your prize will be given to another winner!

Congratulations again!

Internet Email Lottery Commission`,
                attachments: [],
                links: []
            },
            redFlags: [
                'Unexpected lottery win',
                'Never entered a lottery',
                'Requests bank account information',
                'Artificial time pressure',
                'Asks for personal documents',
                'Generic greeting',
                'Too good to be true'
            ],
            correctAnswer: 'phishing',
            explanation: 'This is a classic advance fee fraud. No legitimate lottery selects winners randomly from email addresses, and real lotteries never require bank account information via email.',
            historicalContext: 'Email lottery scams became popular in the late 1990s as people were still learning about internet security. The promise of easy money was particularly effective when online commerce was new.',
            points: 100
        },
        {
            id: 'early-legitimate-newsletter',
            eraId: 'early-internet',
            title: 'Tech Company Newsletter',
            difficulty: 'easy',
            type: 'email',
            content: {
                subject: 'CompuTech Monthly Newsletter - March 1999',
                sender: 'newsletter@computech-corp.com',
                date: 'March 1, 1999 9:00 AM',
                body: `COMPUTECH MONTHLY NEWSLETTER
March 1999 - Volume 3, Issue 3

INSIDE THIS ISSUE:
- New Software Releases
- Hardware Upgrade Tips  
- Industry News

NEW SOFTWARE RELEASES:
This month we're excited to announce the release of CompuTech Office Suite 2.1. New features include improved word processing and basic internet integration.

HARDWARE TIPS:
Consider upgrading your RAM if you're still running with less than 64MB. The new software applications require more memory for optimal performance.

INDUSTRY NEWS:
The internet continues to grow rapidly. We recommend all businesses establish a web presence in the coming year.

To unsubscribe from this newsletter, please email newsletter@computech-corp.com with "unsubscribe" in the subject line.

CompuTech Corporation
123 Technology Drive
Silicon Valley, CA 94301`,
                attachments: [],
                links: ['mailto:newsletter@computech-corp.com']
            },
            redFlags: [],
            correctAnswer: 'legitimate',
            explanation: 'This is a legitimate company newsletter. It contains relevant business information, has a professional tone, includes proper contact information, and doesn\'t request personal information or money.',
            historicalContext: 'Company newsletters were common in the late 1990s as businesses began using email for marketing. They typically contained product announcements and industry information.',
            points: 100
        },
        {
            id: 'early-bank-impersonation',
            eraId: 'early-internet',
            title: 'First Online Bank Security',
            difficulty: 'medium',
            type: 'email',
            content: {
                subject: 'URGENT: First Online Bank - Account Security Alert',
                sender: 'security@firstonline-bank.net',
                date: 'November 10, 1999 4:15 PM',
                body: `FIRST ONLINE BANK
SECURITY DEPARTMENT

URGENT SECURITY NOTICE

Dear Valued Customer,

We have detected unusual activity on your First Online Bank account. For your protection, we have temporarily suspended your online banking access.

To restore your account immediately, please provide the following information:

Account Number: ________________
PIN Number: ___________________
Social Security Number: _________
Mother's Maiden Name: __________

Please type this information and reply to this email immediately. Your account will remain frozen until we receive this verification.

If you do not respond within 24 hours, your account may be permanently closed and your funds transferred to our security department.

Thank you for banking with First Online Bank.

Security Department
First Online Bank
security@firstonline-bank.net

CONFIDENTIAL: This message is intended only for the named recipient.`,
                attachments: [],
                links: []
            },
            redFlags: [
                'Requests sensitive financial information via email',
                'Domain name doesn\'t match real bank',
                'Threatens account closure',
                'Creates artificial urgency',
                'Asks for PIN and SSN',
                'Unprofessional request method',
                'Generic greeting'
            ],
            correctAnswer: 'phishing',
            explanation: 'This is an early phishing attempt impersonating a bank. Real banks never request account numbers, PINs, or Social Security numbers via email. The domain name is also suspicious.',
            historicalContext: 'As online banking emerged in the late 1990s, criminals quickly began impersonating banks to steal credentials. This was before people understood that banks never request sensitive information via email.',
            points: 150
        }
    ],
    'dotcom-boom': [
        {
            id: 'dotcom-nigerian-prince',
            eraId: 'dotcom-boom',
            title: 'Nigerian Prince Fortune',
            difficulty: 'medium',
            type: 'email',
            content: {
                subject: 'URGENT BUSINESS PROPOSAL - CONFIDENTIAL',
                sender: 'prince.ibrahim@nigeria-gov.ng.biz',
                date: 'June 15, 2003 7:23 AM',
                body: `FROM THE DESK OF PRINCE IBRAHIM MOHAMMED
NIGERIAN NATIONAL PETROLEUM CORPORATION

DEAR FRIEND,

I hope this letter meets you in good health. I am Prince Ibrahim Mohammed, the son of late General Mohammed who was recently killed in a plane crash. Before his death, my father deposited the sum of US$30,000,000 (Thirty Million United States Dollars) in a security company.

I need your assistance to transfer this money to your country as I cannot do it alone due to my political situation here in Nigeria. I will give you 30% of the total sum for your assistance.

All I need from you is:
1. Your full name and address
2. Your telephone and fax numbers  
3. A copy of your international passport
4. Your bank account details

This transaction is 100% risk-free and legal. I have all the necessary documents to prove the legitimacy of this money.

Please reply urgently as time is running out.

Yours faithfully,
Prince Ibrahim Mohammed
Direct Phone: +234-1-7359-428
Email: prince.ibrahim@nigeria-gov.ng.biz`,
                attachments: [],
                links: []
            },
            redFlags: [
                'Too good to be true offer',
                'Requests personal identification documents',
                'Asks for bank account details',
                'Suspicious email domain',
                'Implausible backstory',
                'Claims to be royalty/government official',
                'Artificial urgency',
                'Advance fee fraud pattern'
            ],
            correctAnswer: 'phishing',
            explanation: 'This is the classic "Nigerian Prince" or "419 scam" that became infamous during the dot-com era. The elaborate story, request for bank details, and promise of easy money are clear red flags.',
            historicalContext: 'The Nigerian Prince scam became one of the most recognizable email frauds of the early 2000s. It exploited people\'s greed and lack of familiarity with international finance.',
            points: 150
        },
        {
            id: 'dotcom-ebay-fraud',
            eraId: 'dotcom-boom',
            title: 'eBay Second Chance Offer',
            difficulty: 'hard',
            type: 'email',
            content: {
                subject: 'eBay Second Chance Offer - Digital Camera',
                sender: 'secondchance@ebay-offers.com',
                date: 'September 8, 2004 2:17 PM',
                body: `eBay Second Chance Offer

Hello,

You recently bid on the following item but were not the winning bidder:

Item: Canon Digital Rebel Camera Kit
Item Number: 7284639501
Your Bid: $425.00
Winning Bid: $450.00

Good news! The winning bidder was unable to complete the transaction, so we're offering you a second chance to purchase this item at your bid price of $425.00.

This is a special eBay Second Chance Offer and must be completed outside of the normal eBay system for faster processing.

To complete your purchase:
1. Send payment via Western Union to:
   Name: Michael Stevens  
   Address: 425 Commerce St, Los Angeles, CA
   Amount: $425.00

2. Include your eBay username and item number

3. Email the Western Union confirmation number to: confirm@ebay-offers.com

Your item will ship within 24 hours of payment confirmation.

This offer expires in 48 hours.

Thank you for using eBay!

eBay Customer Support
secondchance@ebay-offers.com`,
                attachments: [],
                links: []
            },
            redFlags: [
                'Asks for payment outside eBay system',
                'Requests Western Union payment',
                'Domain name is not official eBay',
                'No buyer protection offered',
                'Urgent time pressure',
                'Bypasses normal auction process',
                'Untraceable payment method required'
            ],
            correctAnswer: 'phishing',
            explanation: 'This is a sophisticated eBay impersonation scam. Real eBay second chance offers are processed through the official eBay system and never request Western Union payments.',
            historicalContext: 'As online auctions became popular in the early 2000s, scammers created fake second chance offers to steal money. The use of untraceable payment methods was a major red flag.',
            points: 200
        }
    ],
    'social-media': [
        {
            id: 'social-facebook-phishing',
            eraId: 'social-media',
            title: 'Facebook Security Alert',
            difficulty: 'medium',
            type: 'email',
            content: {
                subject: 'Facebook Security: Unusual Login Activity Detected',
                sender: 'security-noreply@facebook-security.net',
                date: 'April 20, 2009 11:45 AM',
                body: `Facebook Security Team

Hi there,

We noticed a login to your Facebook account from an unusual location:

Location: Moscow, Russia
Device: Unknown Computer  
Time: April 20, 2009 at 6:32 AM PST
IP Address: 195.82.146.23

If this was you, you can ignore this email. If this wasn't you, your account may have been compromised.

To secure your account immediately, please:

1. Click here to reset your password: http://facebook-security.net/reset-password
2. Review your recent activity
3. Enable login notifications

If you have trouble accessing your account, please contact our support team.

Thanks,
The Facebook Security Team

Facebook, Inc.
1601 Willow Road
Menlo Park, CA 94025`,
                attachments: [],
                links: ['http://facebook-security.net/reset-password']
            },
            redFlags: [
                'Suspicious domain (facebook-security.net vs facebook.com)',
                'External link for password reset',
                'Generic greeting instead of name',
                'Creates fear about account compromise',
                'Link goes to non-Facebook domain'
            ],
            correctAnswer: 'phishing',
            explanation: 'This is a phishing attempt impersonating Facebook. The domain facebook-security.net is not owned by Facebook, and legitimate password resets would direct users to facebook.com.',
            historicalContext: 'As social media platforms gained popularity around 2008-2009, phishers began targeting users with fake security alerts to steal login credentials for identity theft and spam distribution.',
            points: 150
        }
    ]
};

// Achievement Definitions
const ACHIEVEMENTS = {
    // Learning Achievements
    'era-master-early': {
        id: 'era-master-early',
        category: 'learning',
        title: 'Early Internet Master',
        description: 'Complete Early Internet era with 90%+ accuracy',
        icon: '💻',
        unlocked: false,
        condition: (stats) => stats.completedEras.includes('early-internet') && stats.eraAccuracy['early-internet'] >= 0.9
    },
    'speed-demon': {
        id: 'speed-demon',
        category: 'learning', 
        title: 'Speed Demon',
        description: 'Answer 10 scenarios within 20 seconds each',
        icon: '⚡',
        unlocked: false,
        progress: 0,
        target: 10,
        condition: (stats) => stats.speedAnswers >= 10
    },
    'red-flag-expert': {
        id: 'red-flag-expert',
        category: 'learning',
        title: 'Red Flag Expert', 
        description: 'Identify all red flags in 5 consecutive scenarios',
        icon: '🚩',
        unlocked: false,
        progress: 0,
        target: 5,
        condition: (stats) => stats.perfectRedFlagStreak >= 5
    },
    'time-traveler': {
        id: 'time-traveler',
        category: 'learning',
        title: 'Time Traveler',
        description: 'Complete all eras',
        icon: '⏳',
        unlocked: false,
        progress: 0,
        target: 6,
        condition: (stats) => stats.completedEras.length >= 6
    },
    'perfect-game': {
        id: 'perfect-game',
        category: 'learning',
        title: 'Perfect Game',
        description: 'Complete an entire era without any wrong answers',
        icon: '🎯',
        unlocked: false,
        condition: (stats) => Object.values(stats.eraAccuracy).some(accuracy => accuracy === 1.0)
    },

    // Discovery Achievements  
    'history-buff': {
        id: 'history-buff',
        category: 'discovery',
        title: 'History Buff',
        description: 'Read all historical context explanations',
        icon: '📚',
        unlocked: false,
        progress: 0,
        target: 50,
        condition: (stats) => stats.historicalContextsRead >= 50
    },
    'pattern-recognition': {
        id: 'pattern-recognition',
        category: 'discovery',
        title: 'Pattern Recognition',
        description: 'Identify common tactics across multiple eras',
        icon: '🧩',
        unlocked: false,
        condition: (stats) => stats.crossEraPatterns >= 10
    },
    'first-steps': {
        id: 'first-steps',
        category: 'discovery',
        title: 'First Steps',
        description: 'Complete your first scenario',
        icon: '👶',
        unlocked: false,
        condition: (stats) => stats.totalAnswers >= 1
    },
    'eagle-eye': {
        id: 'eagle-eye',
        category: 'discovery',
        title: 'Eagle Eye',
        description: 'Find a red flag that 90% of players miss',
        icon: '👁️',
        unlocked: false,
        condition: (stats) => stats.rareRedFlagsFound >= 1
    }
};

// Red Flag Definitions
const RED_FLAGS = {
    'urgent-language': {
        id: 'urgent-language',
        text: 'Uses urgent or threatening language',
        description: 'Creates artificial time pressure or fear'
    },
    'requests-personal-info': {
        id: 'requests-personal-info', 
        text: 'Requests personal information',
        description: 'Asks for passwords, SSN, bank details, etc.'
    },
    'suspicious-sender': {
        id: 'suspicious-sender',
        text: 'Suspicious sender address',
        description: 'Domain doesn\'t match claimed organization'
    },
    'too-good-to-be-true': {
        id: 'too-good-to-be-true',
        text: 'Too good to be true offer', 
        description: 'Unrealistic promises of money or prizes'
    },
    'poor-grammar': {
        id: 'poor-grammar',
        text: 'Poor grammar or spelling',
        description: 'Contains obvious language mistakes'
    },
    'generic-greeting': {
        id: 'generic-greeting',
        text: 'Generic greeting',
        description: 'Doesn\'t use your actual name'
    },
    'external-links': {
        id: 'external-links',
        text: 'Suspicious external links',
        description: 'Links don\'t go to official domains'
    },
    'unsolicited-contact': {
        id: 'unsolicited-contact',
        text: 'Unsolicited contact',
        description: 'You didn\'t request this communication'
    },
    'attachment-warning': {
        id: 'attachment-warning',
        text: 'Suspicious attachment',
        description: 'Unexpected or unusual file attachments'
    },
    'impersonation': {
        id: 'impersonation',
        text: 'Impersonates trusted entity',
        description: 'Pretends to be from a known organization'
    }
};

// Game Messages and Flavor Text
const GAME_MESSAGES = {
    loading: [
        'Calibrating temporal coordinates...',
        'Synchronizing with timeline matrix...',
        'Loading era-specific threat patterns...',
        'Establishing secure time portal...',
        'Initializing phishing detection algorithms...'
    ],
    eraTransition: [
        'Time portal stabilizing...',
        'Adjusting to era frequencies...',
        'Loading historical context...',
        'Preparing threat database...'
    ],
    victory: [
        'Excellent detective work!',
        'Your cybersecurity skills are impressive!',
        'Time travel mission successful!',
        'Another era secured from phishing!'
    ],
    encouragement: [
        'Keep analyzing those red flags!',
        'Trust your instincts!',
        'Every era teaches us something new!',
        'You\'re getting better at this!'
    ]
};