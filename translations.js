/**
 * ==============================================================================
 * DIGITAL SAATHI (डिजिटल साथी) — Multilingual Translation System
 * Comprehensive local dictionary for English, Hindi (हिंदी), and Marathi (मराठी)
 * ==============================================================================
 */

const TRANSLATIONS = {
  en: {
    // Brand & Header
    brandTitle: "Digital Saathi",
    brandSubtitle: "Your Friendly Smartphone & Safety Companion",
    tagline: "Empowering elders and first-time smartphone users across India",
    startLearning: "Start Learning Now",
    accessibilityTitle: "Accessibility Assistant",
    
    // Navigation
    navHome: "Home",
    navGames: "Mini Games",
    navScam: "Scam Detective",
    navUpi: "Safe UPI Simulator",
    navKnowledge: "Knowledge Centre",
    navProgress: "My Progress",
    navHelp: "Help & Helplines",

    // Accessibility Controls
    textSize: "Text Size",
    textNormal: "Normal",
    textLarge: "Large",
    textHuge: "Huge",
    colorMode: "Theme Mode",
    themeWarm: "Warm Paper",
    themeContrast: "High Contrast",
    themeDark: "Evening Ink",
    readAloud: "Read Aloud",
    stopSpeech: "Stop Speech",
    muteSound: "Sound Effects",
    reducedMotion: "Reduced Motion",

    // Home Page
    welcomeGreeting: "Namaste! Welcome to Digital Saathi 📖",
    welcomeSub: "A calm, beautiful scrapbook designed to help you master smartphones, practice digital payments safely, and stay protected from online frauds.",
    dailyActivityTitle: "Today's Suggested Activity",
    dailyActivityDesc: "Practice recognizing a fake lottery SMS in the Scam Detective — take 2 minutes today!",
    startDailyBtn: "Try Today's Activity",
    quickStatsTitle: "Your Learning Journey",

    // Section Cards on Home
    cardGamesTitle: "8 Fun Mini Games",
    cardGamesDesc: "Play gentle 2D games like Safety Snake, Catch the Safe Dots, and Memory Match.",
    cardScamTitle: "Scam Detective",
    cardScamDesc: "Learn to spot suspicious SMS, fake KYC calls, and lottery scams with realistic examples.",
    cardUpiTitle: "Safe UPI Practice",
    cardUpiDesc: "Zero-risk mock payment simulator. Practice QR codes and learn why PIN is NEVER needed to receive money.",
    cardKnowledgeTitle: "Knowledge Centre",
    cardKnowledgeDesc: "Step-by-step guides for WhatsApp, bank security, passwords, and smartphone settings.",
    cardProgressTitle: "My Progress",
    cardProgressDesc: "See badges earned, games won, and safe lessons completed at your own comfortable pace.",

    // Mini Games Section
    gamesHeaderTitle: "Digital Saathi Mini Games Hub",
    gamesHeaderSubtitle: "Small, lightweight 2D learning games designed for seniors. Play at your own speed with simple controls.",
    btnPlayNow: "Play Game",
    btnRestart: "Restart",
    btnPause: "Pause",
    btnResume: "Resume",
    btnBackToGames: "← Back to Games Menu",
    scoreLabel: "Score",
    highScoreLabel: "Best Score",
    livesLabel: "Attempts Left",
    gameOverTitle: "Game Complete!",
    congratsTitle: "Well Done! 🌟",

    // Game Specific Titles & Descs
    gameSnakeTitle: "Game A: Digital Safety Snake",
    gameSnakeDesc: "Guide the friendly snake to collect safe habits (Protect PIN, Verify Links, Keep OTP Secret).",
    gameDotsTitle: "Game B: Catch the Safe Dots",
    gameDotsDesc: "Catch verified senders and official apps; avoid suspicious links and unknown caller threats.",
    gameTttTitle: "Game C: Digital Safety Tic-Tac-Toe",
    gameTttDesc: "Answer a gentle safety question before making a move. Play against friendly Saathi AI or a family member.",
    gameSpotTitle: "Game D: Spot the Scam",
    gameSpotDesc: "Examine realistic messages and tap the red flags like urgent threats and unknown links.",
    gameMemoryTitle: "Game E: Digital Memory Match",
    gameMemoryDesc: "Flip scrapbook cards to pair digital safety icons with their real meanings.",
    gameSortTitle: "Game F: Safe or Unsafe Sorting",
    gameSortDesc: "Classify everyday phone situations into Safe or Unsafe boxes with clear explanations.",
    gameQuizTitle: "Game G: Digital Knowledge Quiz",
    gameQuizDesc: "Friendly question-and-answer rounds about smartphone tips, cyber hygiene, and privacy.",
    gameSkillsTitle: "Game H: Smartphone Skills Challenge",
    gameSkillsDesc: "Practice everyday phone tasks on a mock phone screen: dial calls, open safe browsers, and block spam.",

    // UPI Simulator
    upiHeaderTitle: "Safe UPI Practice Simulator",
    upiNoticeBanner: "DEMO ONLY — NO REAL MONEY. Strictly a safe educational simulator.",
    upiRuleNumberOne: "GOLDEN RULE: You NEVER need to enter your UPI PIN to RECEIVE money!",
    upiPayShop: "Pay a Shopkeeper Demo",
    upiReceiveMoney: "Receive Money from Relative",
    upiSpotFraudRequest: "Identify Fake Payment Request",
    upiVerifyRecipient: "Verify Name on Screen",
    upiEnterMockPin: "Enter Mock PIN (Secret)",
    upiSuccessReceipt: "Payment Successful (Demo)",
    upiFailedReceipt: "Payment Declined Safely",

    // Scam Detective
    scamHeaderTitle: "Scam Detective: Spot the Red Flags",
    scamSubtitle: "Read the real-life situation below and decide whether it is Safe, Suspicious, or Fraudulent.",
    scamBtnSafe: "🟢 Safe & Genuine",
    scamBtnSuspicious: "🟡 Suspicious",
    scamBtnFraud: "🔴 Fraudulent Scam",
    scamNextScenario: "Next Scenario →",
    scamExplanationHeader: "Detective Analysis & Warning Signs:",
    scamSafestStepHeader: "What is your safest next step?",

    // Knowledge Centre
    kcHeaderTitle: "Digital Knowledge Centre",
    kcHeaderSubtitle: "15 Simple, illustrated guides for everyday smartphone use and online safety.",
    kcSearchPlaceholder: "Search topics (e.g. WhatsApp, UPI, Password, Helpline)...",
    kcAllCategories: "All Topics",
    kcCatBasics: "Phone Basics",
    kcCatSafety: "Safety & Scams",
    kcCatPayments: "Payments & Banking",
    kcCatGov: "Official Helplines",

    // Progress
    progHeaderTitle: "My Learning Progress",
    progSubtitle: "Every step you take makes you more confident and safe on your smartphone.",
    progLessonsCompleted: "Lessons Explored",
    progGamesPlayed: "Games Played",
    progScamsSolved: "Scams Solved",
    progUpiTasks: "UPI Drills Completed",
    btnResetProgress: "Reset My Progress",
    resetConfirmMsg: "Are you sure you want to reset your saved scores and completed badges?",

    // Help & Helplines
    helpTitle: "National Digital Safety Helplines (India)",
    helpDesc: "If you or someone in your family ever suspects digital fraud, immediately reach out to these official government resources:",
    help1930Title: "National Cyber Crime Helpline: Dial 1930",
    help1930Desc: "Available 24x7 across India for financial fraud and online complaints.",
    helpPortalTitle: "Official National Cybercrime Portal",
    helpPortalUrl: "www.cybercrime.gov.in",
    helpSancharSaathiTitle: "Sanchar Saathi (DoT, Govt of India)",
    helpSancharDesc: "Block lost phones and verify how many SIM cards are registered in your name at sancharsaathi.gov.in."
  },

  hi: {
    // Brand & Header
    brandTitle: "डिजिटल साथी",
    brandSubtitle: "आपका अपना सरल स्मार्टफोन और सुरक्षा मार्गदर्शक",
    tagline: "बुजुर्गों और नए स्मार्टफोन उपयोगकर्ताओं के लिए डिजिटल सशक्तिकरण",
    startLearning: "अभी सीखना शुरू करें",
    accessibilityTitle: "सुलभता सहायक (Accessibility)",
    
    // Navigation
    navHome: "मुख्य पृष्ठ",
    navGames: "रोचक खेल",
    navScam: "स्कैम जासूस",
    navUpi: "सुरक्षित UPI अभ्यास",
    navKnowledge: "ज्ञान केंद्र",
    navProgress: "मेरी प्रगति",
    navHelp: "हेल्पलाइन व सहायता",

    // Accessibility Controls
    textSize: "अक्षर आकार",
    textNormal: "सामान्य",
    textLarge: "बड़ा",
    textHuge: "बहुत बड़ा",
    colorMode: "रंग मोड",
    themeWarm: "हल्का कागज़ (Warm)",
    themeContrast: "उच्च स्पष्टता (Contrast)",
    themeDark: "शाम की स्याही (Dark)",
    readAloud: "बोलकर सुनाएं",
    stopSpeech: "आवाज़ रोकें",
    muteSound: "ध्वनि प्रभाव",
    reducedMotion: "धीमी हलचल",

    // Home Page
    welcomeGreeting: "नमस्ते! डिजिटल साथी में आपका हार्दिक स्वागत है 📖",
    welcomeSub: "एक सुंदर, शांत डिजिटल स्क्रैपबुक जो आपको स्मार्टफोन का आसान उपयोग सिखाती है, सुरक्षित यूपीआई अभ्यास कराती है और ऑनलाइन धोखाधड़ी से बचाती है।",
    dailyActivityTitle: "आज की चुनी हुई गतिविधि",
    dailyActivityDesc: "स्कैम जासूस में नकली लॉटरी संदेश पहचानना सीखें — बस 2 मिनट का अभ्यास!",
    startDailyBtn: "आज का अभ्यास करें",
    quickStatsTitle: "आपकी सीखने की यात्रा",

    // Section Cards on Home
    cardGamesTitle: "8 आसान 2D खेल",
    cardGamesDesc: "सुरक्षा सांप, सुरक्षित बिंदु पकड़ो और मेमोरी मैच जैसे मनोरंजक खेल खेलें।",
    cardScamTitle: "स्कैम जासूस (धोखा पहचानें)",
    cardScamDesc: "संदिग्ध SMS, फर्जी बैंक कॉल और लॉटरी वाले संदेशों को पहचानना सीखें।",
    cardUpiTitle: "सुरक्षित UPI अभ्यास",
    cardUpiDesc: "बिना किसी असली पैसे का अभ्यास। समझें कि पैसे पाने के लिए कभी पिन नहीं डालना होता।",
    cardKnowledgeTitle: "ज्ञान केंद्र (सरल पाठ)",
    cardKnowledgeDesc: "व्हाट्सएप, पासवर्ड सुरक्षा और स्मार्टफोन सेटिंग्स पर आसान चरणबद्ध गाइड।",
    cardProgressTitle: "मेरी प्रगति",
    cardProgressDesc: "अपने जीते हुए पदक, खेले गए खेल और पूरा किया गया ज्ञान देखें।",

    // Mini Games Section
    gamesHeaderTitle: "डिजिटल साथी खेल केंद्र",
    gamesHeaderSubtitle: "वरिष्ठ नागरिकों के लिए विशेष रूप से बनाए गए सरल व ज्ञानवर्धक खेल। अपनी गति से खेलें।",
    btnPlayNow: "खेलें",
    btnRestart: "पुनः शुरू करें",
    btnPause: "रोकें",
    btnResume: "चालू रखें",
    btnBackToGames: "← खेलों की सूची पर लौटें",
    scoreLabel: "अंक",
    highScoreLabel: "सर्वश्रेष्ठ अंक",
    livesLabel: "शेष प्रयास",
    gameOverTitle: "खेल समाप्त!",
    congratsTitle: "बहुत बढ़िया! 🌟",

    // Game Specific Titles & Descs
    gameSnakeTitle: "खेल 1: डिजिटल सुरक्षा सांप",
    gameSnakeDesc: "सांप को सुरक्षित आदतों (पिन छुपाना, लिंक जांचना, OTP गोपनीय रखना) की ओर ले जाएं।",
    gameDotsTitle: "खेल 2: सुरक्षित बिंदु पकड़ो",
    gameDotsDesc: "प्रमाणित ऐप व सुरक्षित संदेशों को टोकरी में पकड़ें; संदिग्ध लिंक से बचें।",
    gameTttTitle: "खेल 3: डिजिटल सुरक्षा टिक-टैक-टो",
    gameTttDesc: "चाल चलने से पहले एक छोटे सुरक्षा सवाल का जवाब दें।",
    gameSpotTitle: "खेल 4: धोखा पहचानें (स्पॉट द स्कैम)",
    gameSpotDesc: "संदेशों में छुपी लाल झंडियों (धमकियां, फर्जी लिंक) को ढूंढें।",
    gameMemoryTitle: "खेल 5: डिजिटल मेमोरी मैच",
    gameMemoryDesc: "कार्ड पलटकर सुरक्षा चिह्नों को उनके सही अर्थ से मिलाएं।",
    gameSortTitle: "खेल 6: सुरक्षित या असुरक्षित छांटना",
    gameSortDesc: "फोन से जुड़े दैनिक व्यवहारों को सुरक्षित या असुरक्षित डिब्बे में डालें।",
    gameQuizTitle: "खेल 7: डिजिटल ज्ञान प्रश्नोत्तरी",
    gameQuizDesc: "स्मार्टफोन और डिजिटल सुरक्षा से जुड़े आसान व ज्ञानवर्धक सवाल।",
    gameSkillsTitle: "खेल 8: फोन कौशल चुनौती",
    gameSkillsDesc: "दैनिक फोन कार्य जैसे कॉल लगाना, वाई-फाई खोलना और स्पैम कॉल ब्लॉक करना सीखें।",

    // UPI Simulator
    upiHeaderTitle: "सुरक्षित UPI अभ्यास सिमुलेटर",
    upiNoticeBanner: "केवल अभ्यास हेतु — कोई असली पैसा नहीं। पूरी तरह सुरक्षित सिमुलेटर।",
    upiRuleNumberOne: "सुनहरा नियम: पैसे प्राप्त करने के लिए कभी भी अपना UPI पिन नहीं डालना पड़ता!",
    upiPayShop: "दुकानदार को भुगतान अभ्यास",
    upiReceiveMoney: "रिश्तेदार से पैसे प्राप्त करना",
    upiSpotFraudRequest: "फर्जी पेमेंट रिक्वेस्ट पहचानना",
    upiVerifyRecipient: "स्क्रीन पर नाम जांचना",
    upiEnterMockPin: "नकली पिन दर्ज करें (गोपनीय)",
    upiSuccessReceipt: "भुगतान सफल (डेमो)",
    upiFailedReceipt: "धोखे से सुरक्षित बचाव",

    // Scam Detective
    scamHeaderTitle: "स्कैम जासूस: खतरे की घंटी पहचानें",
    scamSubtitle: "नीचे दी गई स्थिति को पढ़ें और तय करें कि यह सुरक्षित है, संदिग्ध है, या धोखाधड़ी है।",
    scamBtnSafe: "🟢 सुरक्षित और असली",
    scamBtnSuspicious: "🟡 संदिग्ध (सावधान)",
    scamBtnFraud: "🔴 फर्जी धोखा (स्कैम)",
    scamNextScenario: "अगली स्थिति →",
    scamExplanationHeader: "जासूस की समझ और चेतावनी संकेत:",
    scamSafestStepHeader: "आपका सबसे सुरक्षित अगला कदम क्या होना चाहिए?",

    // Knowledge Centre
    kcHeaderTitle: "डिजिटल ज्ञान केंद्र",
    kcHeaderSubtitle: "रोजमर्रा के फोन उपयोग और सुरक्षा पर 15 सरल व सचित्र मार्गदर्शिकाएं।",
    kcSearchPlaceholder: "विषय खोजें (जैसे व्हाट्सएप, यूपीआई, पासवर्ड, हेल्पलाइन)...",
    kcAllCategories: "सभी विषय",
    kcCatBasics: "फोन के मूल मंत्र",
    kcCatSafety: "सुरक्षा व धोखाधड़ी से बचाव",
    kcCatPayments: "भुगतान और बैंकिंग",
    kcCatGov: "सरकारी हेल्पलाइन",

    // Progress
    progHeaderTitle: "मेरी सीखने की प्रगति",
    progSubtitle: "आपका हर कदम आपको स्मार्टफोन पर अधिक आत्मविश्वासी और सुरक्षित बनाता है।",
    progLessonsCompleted: "सीखे गए पाठ",
    progGamesPlayed: "खेले गए खेल",
    progScamsSolved: "सुलझाए गए स्कैम",
    progUpiTasks: "पूरे किए गए UPI अभ्यास",
    btnResetProgress: "मेरी प्रगति रीसेट करें",
    resetConfirmMsg: "क्या आप अपनी सहेजी गई प्रगति और पदक रीसेट करना चाहते हैं?",

    // Help & Helplines
    helpTitle: "राष्ट्रीय साइबर सुरक्षा हेल्पलाइन (भारत)",
    helpDesc: "यदि आपको या परिवार में किसी को भी ऑनलाइन धोखाधड़ी का संदेह हो, तो तुरंत इनसे संपर्क करें:",
    help1930Title: "राष्ट्रीय साइबर अपराध हेल्पलाइन: 1930 डायल करें",
    help1930Desc: "ऑनलाइन वित्तीय धोखाधड़ी के लिए पूरे भारत में 24 घंटे उपलब्ध।",
    helpPortalTitle: "आधिकारिक साइबर अपराध पोर्टल",
    helpPortalUrl: "www.cybercrime.gov.in",
    helpSancharSaathiTitle: "संचार साथी (दूरसंचार विभाग, भारत सरकार)",
    helpSancharDesc: "खोए फोन ब्लॉक करें और sancharsaathi.gov.in पर देखें आपके नाम पर कितने सिम हैं।"
  },

  mr: {
    // Brand & Header
    brandTitle: "डिजिटल साथी",
    brandSubtitle: "तुमचा हक्काचा स्मार्टफोन व सुरक्षा मार्गदर्शक",
    tagline: "ज्येष्ठ नागरिक आणि प्रथमच स्मार्टफोन वापरणाऱ्यांसाठी डिजिटल सक्षमीकरण",
    startLearning: "आत्ताच शिकायला सुरुवात करा",
    accessibilityTitle: "सुलभता सहाय्यक (Accessibility)",
    
    // Navigation
    navHome: "मुख्य पान",
    navGames: "छान खेळ",
    navScam: "स्कॅम डिटेक्टिव्ह",
    navUpi: "सुरक्षित UPI सराव",
    navKnowledge: "माहिती केंद्र",
    navProgress: "माझी प्रगती",
    navHelp: "मदत व हेल्पलाईन",

    // Accessibility Controls
    textSize: "अक्षर आकार",
    textNormal: "सामान्य",
    textLarge: "मोठा",
    textHuge: "खूप मोठा",
    colorMode: "रंग पर्याय",
    themeWarm: "उबदार कागद (Warm)",
    themeContrast: "ठळक दृश्य (Contrast)",
    themeDark: "रात्र शाई (Dark)",
    readAloud: "वाचून दाखवा",
    stopSpeech: "आवाज थांबवा",
    muteSound: "ध्वनी प्रभाव",
    reducedMotion: "संथ हालचाल",

    // Home Page
    welcomeGreeting: "नमस्कार! डिजिटल साथी मध्ये आपले सहर्ष स्वागत आहे 📖",
    welcomeSub: "स्मार्टफोनचा सोपा वापर शिकवणारी, सुरक्षित यूपीआयचा सराव करून घेणारी आणि सायबर फसवणुकीपासून रक्षण करणारी खास डिजिटल वही.",
    dailyActivityTitle: "आजचा सुचवलेला उपक्रम",
    dailyActivityDesc: "स्कॅम डिटेक्टिव्हमध्ये खोटा लॉटरी संदेश ओळखणे शिका — फक्त २ मिनिटे!",
    startDailyBtn: "आजचा सराव करा",
    quickStatsTitle: "तुमचा शिकण्याचा प्रवास",

    // Section Cards on Home
    cardGamesTitle: "८ सोपे २D खेळ",
    cardGamesDesc: "सुरक्षा साप, सुरक्षित थेंब पकडा आणि मेमरी मॅच यांसारखे मजेशीर खेळ खेळा.",
    cardScamTitle: "स्कॅम डिटेक्टिव्ह (फसवणूक ओळखा)",
    cardScamDesc: "संशयास्पद मेसेज, खोटे बँक कॉल आणि खोट्या लॉटरी मेसेजमधील धोके ओळखा.",
    cardUpiTitle: "सुरक्षित UPI सराव",
    cardUpiDesc: "खरे पैसे न वापरता सुरक्षित सराव. पैसे स्वीकारताना पिन लागत नाही हे समजून घ्या.",
    cardKnowledgeTitle: "माहिती केंद्र (सोपे धडे)",
    cardKnowledgeDesc: "व्हॉट्सॲप, पासवर्ड आणि फोन सेटिंग्ज यावरील सोपे सचित्र मार्गदर्शन.",
    cardProgressTitle: "माझी प्रगती",
    cardProgressDesc: "तुम्ही मिळवलेले गुण, खेळलेले खेळ आणि पूर्ण केलेले धडे पहा.",

    // Mini Games Section
    gamesHeaderTitle: "डिजिटल साथी खेळ केंद्र",
    gamesHeaderSubtitle: "ज्येष्ठ नागरिकांसाठी खास तयार केलेले हलकेफुलके आणि सुरक्षित खेळ. तुमच्या गतीने खेळा.",
    btnPlayNow: "खेळा",
    btnRestart: "पुन्हा सुरू करा",
    btnPause: "थांबवा",
    btnResume: "पुढे चालू ठेवा",
    btnBackToGames: "← खेळांच्या सूचीकडे परत",
    scoreLabel: "गुण",
    highScoreLabel: "सर्वोत्तम गुण",
    livesLabel: "उरलेले प्रयत्न",
    gameOverTitle: "खेळ समाप्त!",
    congratsTitle: "खूप छान! 🌟",

    // Game Specific Titles & Descs
    gameSnakeTitle: "खेळ १: डिजिटल सुरक्षा साप",
    gameSnakeDesc: "सापाला सुरक्षित सवयी (पिन लपवणे, लिंक तपासणे, OTP गुप्त ठेवणे) कडे घेऊन जा.",
    gameDotsTitle: "खेळ २: सुरक्षित ठिपके पकडा",
    gameDotsDesc: "अधिकृत ॲप्स आणि सुरक्षित संदेश टोपलीत गोळा करा; संशयास्पद लिंक टाळा.",
    gameTttTitle: "खेळ ३: डिजिटल टिक-टॅक-टो",
    gameTttDesc: "प्रत्येक चालीपूर्वी एका सोप्या सुरक्षा प्रश्नाचे योग्य उत्तर द्या.",
    gameSpotTitle: "खेळ ४: फसवणूक शोधा (स्पॉट द स्कॅम)",
    gameSpotDesc: "मेसेजमधील संशयास्पद गोष्टी (धमक्या, बनावट लिंक्स) ओळखा.",
    gameMemoryTitle: "खेळ ५: डिजिटल मेमरी मॅच",
    gameMemoryDesc: "कार्डे उलटी करून सुरक्षा चिन्हांची त्यांच्या योग्य अर्थाशी जोडी लावा.",
    gameSortTitle: "खेळ ६: सुरक्षित की असुरक्षित वर्गीकरण",
    gameSortDesc: "दैनंदिन कृती सुरक्षित किंवा असुरक्षित डब्यामध्ये योग्य प्रकारे टाका.",
    gameQuizTitle: "खेळ ७: डिजिटल ज्ञान प्रश्नमंजुषा",
    gameQuizDesc: "स्मार्टफोन आणि ऑनलाइन सुरक्षेवर आधारित सोपे आणि माहितीपूर्ण प्रश्न.",
    gameSkillsTitle: "खेळ ८: फोन कौशल्य आव्हान",
    gameSkillsDesc: "फोन करणे, वाय-फाय चालू करणे आणि स्पॅम कॉलर ब्लॉक करणे यांसारख्या प्रत्यक्ष कृती करा.",

    // UPI Simulator
    upiHeaderTitle: "सुरक्षित UPI सराव सिमुलेटर",
    upiNoticeBanner: "केवळ सरावासाठी — खरे पैसे नाहीत. १००% सुरक्षित प्रात्यक्षिक सिमुलेटर.",
    upiRuleNumberOne: "सुवर्ण नियम: पैसे मिळवण्यासाठी कधीही तुमचा UPI पिन टाकावा लागत नाही!",
    upiPayShop: "दुकानदाराला पेमेंट करण्याचा सराव",
    upiReceiveMoney: "नातेवाईकांकडून पैसे स्वीकारणे",
    upiSpotFraudRequest: "खोटी पेमेंट विनंती ओळखणे",
    upiVerifyRecipient: "स्क्रीनवरील व्यक्तीचे नाव तपासणे",
    upiEnterMockPin: "डमी पिन टाका (नेहमी गुप्त ठेवा)",
    upiSuccessReceipt: "पेमेंट यशस्वी (डेमो)",
    upiFailedReceipt: "फसवणुकीपासून सुरक्षित बचाव",

    // Scam Detective
    scamHeaderTitle: "स्कॅम डिटेक्टिव्ह: धोक्याच्या घंटा ओळखा",
    scamSubtitle: "खालील प्रसंग काळजीपूर्वक वाचा आणि तो सुरक्षित, संशयास्पद की फसवणूक आहे ते ठरवा.",
    scamBtnSafe: "🟢 सुरक्षित आणि अधिकृत",
    scamBtnSuspicious: "🟡 संशयास्पद (काळजी घ्या)",
    scamBtnFraud: "🔴 खोटी फसवणूक (स्कॅम)",
    scamNextScenario: "पुढील प्रसंग →",
    scamExplanationHeader: "डिटेक्टिव्ह विश्लेषण आणि धोक्याचे संकेत:",
    scamSafestStepHeader: "तुमचे सर्वात सुरक्षित पुढील पाऊल काय असावे?",

    // Knowledge Centre
    kcHeaderTitle: "डिजिटल माहिती केंद्र",
    kcHeaderSubtitle: "दैनंदिन स्मार्टफोन वापर आणि सुरक्षेसाठी १५ सोपी सचित्र मार्गदर्शने.",
    kcSearchPlaceholder: "विषय शोधा (उदा. व्हॉट्सॲप, यूपीआई, पासवर्ड, हेल्पलाईन)...",
    kcAllCategories: "सर्व विषय",
    kcCatBasics: "स्मार्टफोनचे प्राथमिक धडे",
    kcCatSafety: "सायबर सुरक्षा आणि बचाव",
    kcCatPayments: "ऑनलाइन पेमेंट व बँक",
    kcCatGov: "अधिकृत हेल्पलाईन",

    // Progress
    progHeaderTitle: "माझी शिकण्याची प्रगती",
    progSubtitle: "प्रत्येक नवीन धडा तुम्हाला स्मार्टफोन वापरताना अधिक सुरक्षित आणि आत्मविश्वासी बनवतो.",
    progLessonsCompleted: "अभ्यासलेले धडे",
    progGamesPlayed: "खेळलेले खेळ",
    progScamsSolved: "ओळखलेले स्कॅम",
    progUpiTasks: "पूर्ण केलेले UPI सराव",
    btnResetProgress: "माझी प्रगती रीसेट करा",
    resetConfirmMsg: "तुम्हाला तुमची प्रगती आणि पदक रीसेट करायचे आहेत का?",

    // Help & Helplines
    helpTitle: "राष्ट्रीय सायबर सुरक्षा हेल्पलाईन (भारत)",
    helpDesc: "आपणास किंवा कुटुंबातील कोणालाही ऑनलाइन फसवणुकीचा संशय आल्यास त्वरित येथे संपर्क साधा:",
    help1930Title: "राष्ट्रीय सायबर गुन्हे हेल्पलाईन: १९३० डायल करा",
    help1930Desc: "ऑनलाइन आर्थिक फसवणुकीविरोधात तक्रारीसाठी देशभरात २४ तास कार्यरत.",
    helpPortalTitle: "अधिकृत राष्ट्रीय सायबर क्राईम पोर्टल",
    helpPortalUrl: "www.cybercrime.gov.in",
    helpSancharSaathiTitle: "संचार साथी (दूरसंचार विभाग, भारत सरकार)",
    helpSancharDesc: "हरवलेले फोन ब्लॉक करा आणि sancharsaathi.gov.in वर तपासा तुमच्या नावावर किती सिम कार्ड आहेत."
  }
};
