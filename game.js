/**
 * Future Ready — Scenario-based learning game
 * Year 12 Careers and Employability (CEM) Unit 3
 * Nature of Work. Content aligned to CEM G12 U3 (megatrends, work environments,
 * types of employment, emerging and declining jobs). Authoritative source: unit materials.
 */

(function () {
  'use strict';

  const MEGATRENDS = {
    tech: { label: 'Impactful technology', class: 'pill--tech' },
    climate: { label: 'Climate change', class: 'pill--climate' },
    demographics: { label: 'Demographic shifts', class: 'pill--demographics' },
    economic: { label: 'Economic power shifts', class: 'pill--economic' }
  };

  const SKILLS = {
    communication: 'Communication',
    teamwork: 'Teamwork',
    problemSolving: 'Problem solving',
    digitalLiteracy: 'Digital literacy',
    criticalThinking: 'Critical thinking',
    timeManagement: 'Time management'
  };

  /** Asset paths for employability skill logos (assets folder). */
  const SKILL_IMAGES = {
    communication: 'assets/Communication Logo.png',
    teamwork: 'assets/Teamwork Logo.png',
    problemSolving: 'assets/Problem Solving Logo.png',
    digitalLiteracy: 'assets/Digital Literacy Logo.png',
    criticalThinking: 'assets/Critical Thinking Logo.png',
    timeManagement: 'assets/Time Management Logo.png'
  };

  /** Order of megatrends: intel → scenario for each (no quiz gate). Scenario index for each. */
  const MEGATREND_ORDER = ['tech', 'climate', 'demographics', 'economic'];
  const QUIZ_PASS_PERCENT = 80;
  const SHORT_ANSWER_MIN_LENGTH = 25;
  const STORAGE_KEY = 'futureReady_save';
  const DASHBOARD_SKILL_KEYS = ['communication', 'teamwork', 'problemSolving', 'digitalLiteracy', 'criticalThinking', 'timeManagement'];
  const MAX_SKILL_POINTS = 20;
  const REFLECTION_QUESTIONS = [
    'How might the megatrends you explored affect the industry or job you are most interested in?',
    'Which employability skill do you want to strengthen before you leave school? How could you practise it?',
    'What is one thing you would do differently if you did this activity again?',
    'How could you use your strongest employability skill to stand out in a job application or interview?'
  ];

  /**
   * Quiz questions per megatrend. Aligned to CEM unit and command verbs (Explain, Describe).
   * Explain = cause + effect; Describe = key features. See Year 12 CAE Assessment Skills.
   */
  const QUIZZES = {
    tech: {
      label: 'Impactful technology',
      questions: [
        {
          type: 'multichoice',
          commandVerb: 'Describe',
          question: 'Describe the impact of impactful technology on work environments. Which of these is correct?',
          options: [
            'Growth in remote work, telecommuting and working from home',
            'No change to how or where people work',
            'Only a decline in office jobs'
          ],
          correctIndex: 0
        },
        {
          type: 'multichoice',
          commandVerb: 'Describe',
          question: 'Describe the impact of impactful technology on types of employment. Which applies?',
          options: [
            'Increased workplace flexibility; growth in gig work and freelance jobs',
            'Only full-time, on-site jobs',
            'Fewer flexible roles'
          ],
          correctIndex: 0
        },
        {
          type: 'multichoice',
          commandVerb: 'Explain',
          question: 'Explain impact on emerging and declining jobs. Which statement is correct?',
          options: [
            'Emerging: systems developer, data analyst, AI trainer. Declining: many administrative, clerical and routine data-entry roles',
            'Only clerical jobs are emerging',
            'No jobs are declining'
          ],
          correctIndex: 0
        },
        {
          type: 'multichoice',
          commandVerb: 'Describe',
          question: 'In a small organisation (e.g. local accounting firm), how might this megatrend influence employability skills and work?',
          options: [
            'Staff may need to upskill in cloud-based software (e.g. Xero, MYOB); hybrid or remote work; digital literacy is important',
            'No upskilling or technology change',
            'Only manual work remains'
          ],
          correctIndex: 0
        },
        {
          type: 'multichoice',
          commandVerb: 'Describe',
          question: 'In a large organisation (e.g. mining in the Pilbara), how might impactful technology influence work and employability skills?',
          options: [
            'New roles (e.g. drone operators, AI system technicians, remote operations); some traditional roles replaced by automation',
            'No change in roles or technology',
            'Only manual operators needed'
          ],
          correctIndex: 0
        },
        {
          type: 'shortanswer',
          commandVerb: 'Explain',
          question: 'Explain in your own words (using keywords from the unit) what the megatrend Impactful technology means and how it affects the nature of work.',
          placeholder: 'Use keywords such as automation, AI, digital transformation, digitisation, work environments, types of employment...',
          minLength: SHORT_ANSWER_MIN_LENGTH
        }
      ]
    },
    climate: {
      label: 'Climate change',
      questions: [
        {
          type: 'multichoice',
          commandVerb: 'Describe',
          question: 'Describe the impact of climate change on work environments. Which is correct?',
          options: [
            'Need for more sustainable practices; reduce waste and emissions; organisations under pressure to show environmental responsibility',
            'No change to work practices',
            'Only more use of fossil fuels',
            'Only voluntary; no real pressure on organisations yet'
          ],
          correctIndex: 0
        },
        {
          type: 'multichoice',
          commandVerb: 'Describe',
          question: 'Describe the impact of climate change on types of employment. Which applies?',
          options: [
            'Growth in roles in sustainability, clean energy, recycling, circular economy; existing occupations evolving to meet environmental standards',
            'Only jobs in fossil fuels',
            'No new types of jobs'
          ],
          correctIndex: 0
        },
        {
          type: 'multichoice',
          commandVerb: 'Explain',
          question: 'Explain impact on emerging and declining jobs. Which statement is correct?',
          options: [
            'Emerging: environmental consultant, solar technician, sustainability officer. Declining: many roles in fossil fuel and high-waste industries',
            'Only coal and gas jobs are growing',
            'No jobs are declining'
          ],
          correctIndex: 0
        },
        {
          type: 'multichoice',
          commandVerb: 'Describe',
          question: 'In a small organisation (e.g. landscaping business), how might climate change influence employability skills and work?',
          options: [
            'Council contracts may require sustainable practices; staff training in environmental standards and certifications; problem-solving and communication needed',
            'No environmental standards apply',
            'Only cost matters'
          ],
          correctIndex: 0
        },
        {
          type: 'multichoice',
          commandVerb: 'Describe',
          question: 'In a large organisation (e.g. construction), how might climate change influence work and employability skills?',
          options: [
            'Project approvals may depend on emissions reduction and ESG standards; new roles in environmental compliance and carbon accounting',
            'No environmental requirements',
            'Only local standards apply'
          ],
          correctIndex: 0
        },
        {
          type: 'shortanswer',
          commandVerb: 'Explain',
          question: 'Explain in your own words (using unit keywords) what the megatrend Climate change means for the nature of work (work environments, types of employment, emerging and declining jobs).',
          placeholder: 'Use keywords such as sustainability, emissions, clean energy, work environments, green jobs...',
          minLength: SHORT_ANSWER_MIN_LENGTH
        }
      ]
    },
    demographics: {
      label: 'Demographic shifts',
      questions: [
        {
          type: 'multichoice',
          commandVerb: 'Describe',
          question: 'Describe what demographic shifts refer to. Which is correct?',
          options: [
            'Changes in the composition of populations: age, gender, ethnicity, family status, work patterns (e.g. ageing, migration, female participation)',
            'Only technology change',
            'Only weather patterns'
          ],
          correctIndex: 0
        },
        {
          type: 'multichoice',
          commandVerb: 'Describe',
          question: 'Describe the impact of demographic shifts on work environments. Which applies?',
          options: [
            'More inclusive and flexible workplaces; support for older workers, parents, multicultural teams; family-friendly arrangements',
            'Fixed 8–5 hours only; one-size-fits-all',
            'No change'
          ],
          correctIndex: 0
        },
        {
          type: 'multichoice',
          commandVerb: 'Describe',
          question: 'Describe the impact on types of employment. Which is correct?',
          options: [
            'Demand for health-care, aged-care, disability support; numerical flexibility (casual, part-time, shift-work) and functional flexibility (multi-skilling)',
            'Only full-time 9–5 jobs',
            'No flexibility'
          ],
          correctIndex: 0
        },
        {
          type: 'multichoice',
          commandVerb: 'Describe',
          question: 'In a small organisation (e.g. aged-care/NDIS provider), how might demographic shifts influence employability skills and work?',
          options: [
            'Need for flexible, compassionate workers; CALD clients; cultural sensitivity training; inclusive policies and work/life balance; teamwork and communication',
            'No diversity or flexibility',
            'Only young staff'
          ],
          correctIndex: 0
        },
        {
          type: 'multichoice',
          commandVerb: 'Describe',
          question: 'In a large organisation (e.g. public health), how might demographic shifts influence work and employability skills?',
          options: [
            'Demand for diverse and bilingual staff, inclusion officers; flexible rosters, job-sharing, remote support; communication and time management',
            'One culture and fixed hours only',
            'No change to workforce'
          ],
          correctIndex: 0
        },
        {
          type: 'shortanswer',
          commandVerb: 'Explain',
          question: 'Explain in your own words (using unit keywords) how demographic shifts impact the nature of work (work environments, types of employment, emerging and declining jobs).',
          placeholder: 'Use keywords such as ageing, migration, inclusive, flexibility, health-care, CALD, work/life balance...',
          minLength: SHORT_ANSWER_MIN_LENGTH
        }
      ]
    },
    economic: {
      label: 'Economic power shifts',
      questions: [
        {
          type: 'multichoice',
          commandVerb: 'Describe',
          question: 'Describe what economic power shifts refer to (for CEM). Which is correct?',
          options: [
            'Changes in the global balance of economic influence; growth in Asia and emerging economies; shift away from traditional Western economies',
            'Only local shops',
            'Only technology'
          ],
          correctIndex: 0
        },
        {
          type: 'multichoice',
          commandVerb: 'Describe',
          question: 'Describe the impact of economic power shifts on work environments. Which applies?',
          options: [
            'More globally connected; round-the-clock communication; trade and collaboration with Asia-Pacific; cultural and logistical complexity',
            'Only local work',
            'No change'
          ],
          correctIndex: 0
        },
        {
          type: 'multichoice',
          commandVerb: 'Describe',
          question: 'Describe the impact on types of employment. Which is correct?',
          options: [
            'Changes to supply-chains; greater demand for language and intercultural skills; digital collaboration across borders; some outsourcing',
            'Only domestic jobs',
            'No new skills needed'
          ],
          correctIndex: 0
        },
        {
          type: 'multichoice',
          commandVerb: 'Describe',
          question: 'In a small organisation (e.g. independent retailer), how might economic power shifts influence employability skills and work?',
          options: [
            'Competition from global e-commerce; can compete with localised/niche value (e.g. Australian-made) or global shipping if digitally capable; critical thinking and communication',
            'No competition or change',
            'Only import from overseas'
          ],
          correctIndex: 0
        },
        {
          type: 'multichoice',
          commandVerb: 'Describe',
          question: 'In a large organisation (e.g. agribusiness exporter), how might economic power shifts influence work and employability skills?',
          options: [
            'Need for cross-cultural understanding, trade compliance, international logistics; demand from Asia-Pacific; workers with time management and global outlook',
            'Only local sales',
            'No exports or global links'
          ],
          correctIndex: 0
        },
        {
          type: 'shortanswer',
          commandVerb: 'Explain',
          question: 'Explain in your own words (using unit keywords) what economic power shifts mean for the nature of work (work environments, types of employment, emerging and declining jobs).',
          placeholder: 'Use keywords such as global, Asia, competition, supply-chain, cross-cultural, outsourcing...',
          minLength: SHORT_ANSWER_MIN_LENGTH
        }
      ]
    }
  };

  /** Intel feed (briefing) before each scenario. No quiz gate: player reads then decides. */
  const INTEL_FEED = {
    tech: [
      { type: 'image', imageSrc: 'assets/Impactful technology Mechanic Complaint.png', voiceoverSrc: 'assets/Voiceover Mechanic complaint.mp3', title: 'Customer Email' },
      { type: 'headline', title: 'Industry update', body: 'Small firms under pressure to adopt cloud accounting; clients expect real-time access. Firms that delay risk losing business.' },
      { type: 'message', title: 'Team chat', body: 'Supervisor: "Rollout is a week behind. I need someone the team will listen to. Can you help run a trial?"' },
      { type: 'email', title: 'From: Practice manager', body: 'Reminder: Xero training is mandatory. One colleague has said they "don’t do computers." We need everyone on board or we lose clients.' },
      { type: 'snippet', title: 'Staff comment', body: '"I’ve always done it on paper. I’m not sure I can learn all this." — Colleague' }
    ],
    climate: [
      { type: 'headline', title: 'Sector news', body: 'Demand for sustainability reporting and green skills is rising. Businesses that don’t adapt face regulatory and reputational risk.' },
      { type: 'message', title: 'Briefing', body: 'Your org is reviewing its environmental footprint. You’ve been asked to help gather ideas and feedback from staff.' },
      { type: 'email', title: 'From: Operations', body: 'New sustainability targets for the next financial year. We need input from all teams—including placement students.' },
      { type: 'snippet', title: 'Staff comment', body: '"Some people think it’s just tick-box. But customers are asking what we’re doing." — Team lead' }
    ],
    demographics: [
      { type: 'headline', title: 'Labour market', body: 'Ageing workforce and skills shortages in care, health and trades. Flexible work and inclusion are becoming key to retention.' },
      { type: 'message', title: 'Update', body: 'We’re looking at flexible rosters and better support for carers. Your perspective as a younger team member would help.' },
      { type: 'email', title: 'From: HR', body: 'Reminder: demographic shifts mean we need to attract and keep diverse talent. Please share any ideas with your supervisor.' },
      { type: 'snippet', title: 'Staff comment', body: '"We’ve lost good people because we couldn’t offer flexibility. Things have to change." — Colleague' }
    ],
    economic: [
      { type: 'headline', title: 'Markets', body: 'Global supply chains and competition from overseas are reshaping local jobs. Cross-cultural and digital skills are in demand.' },
      { type: 'message', title: 'Briefing', body: 'The business is exploring new markets. There’s tension between "we’ve always done it this way" and "we need to adapt."' },
      { type: 'email', title: 'From: Management', body: 'Economic power shifts mean we need staff who can work across cultures and use data. Training and development are priorities.' },
      { type: 'snippet', title: 'Staff comment', body: '"I’m not sure where my role fits if we go more global. But I’m willing to learn." — Colleague' }
    ],
    diversity: [
      { type: 'headline', title: 'Workplace', body: 'Inclusive teams perform better. Diversity of thought and background is increasingly valued by employers and clients.' },
      { type: 'message', title: 'Briefing', body: 'You’re in a meeting where not everyone’s view is being heard. How you respond will affect how the team works together.' },
      { type: 'snippet', title: 'Staff comment', body: '"When we actually listen to everyone, we make better decisions. It’s not always easy." — Manager' }
    ]
  };

  const SCENARIOS = [
    {
      id: 'tech-small-firm',
      megatrend: 'tech',
      title: 'Impact of technology — small firm',
      titleLarge: 'Impact of technology — large organisation',
      story: 'Your supervisor pulls you aside: "I need someone the team will actually listen to. The rollout’s a week behind and we could lose clients." You’re on work experience at a small accounting firm that’s switching to Xero. One colleague has said they "don’t do computers" and the rest of the team is nervous. If the practice doesn’t get up to speed, they could lose clients who’ve already started asking about cloud access.',
      storyLarge: 'You’re on placement at a Pilbara mining operation that’s bringing in autonomous haul trucks and drones. Some workers see it as the end of their jobs; the union rep is in the room and tensions are high. Your supervisor needs someone to help run a trial and support people who might have to retrain—and she’s looking at you.',
      prompt: 'What do you do?',
      choices: [
        {
          id: 'upskill-lead',
          text: 'Agree to upskill and run a short in-house demo so the team can practise together.',
          consequence: 'You run the demo. A few eye-rolls at first—then even the "I don’t do computers" person is clicking through. Your supervisor actually smiles. You’re now the one people ask when Xero glitches.',
          feedback: 'Technology is changing work through digitisation and remote work; demand for digital skills is rising. Leading a demo builds your digital literacy and shows you can learn and teach new systems.',
          megatrendConcept: 'Impactful technology is changing work environments through digitisation and remote work; demand for digital skills is rising.',
          why: 'Leading a demo helps the team adapt and shows employers you can learn and teach new systems.',
          skillBuilt: 'This choice builds Digital literacy, Communication, and Enterprising behaviours.',
          skillPoints: { digitalLiteracy: 2, communication: 1, timeManagement: 2 },
          oneLiner: 'Employers value staff who can upskill and support others with new technology.',
          skills: ['digitalLiteracy', 'communication', 'timeManagement']
        },
        {
          id: 'team-support',
          text: 'Suggest a small team takes the lead so people can ask questions and share tips as they learn.',
          consequence: 'You get a few people to lead together. It takes longer, but nobody’s left behind. The sceptic still mutters—but they turn up to the next practice. Your supervisor notes you "don’t leave people in the lurch".',
          tradeOff: 'Trade-off: you didn’t take the lead yourself, so your time management score doesn’t jump—but the team moved together.',
          feedback: 'Technology is driving flexibility and new job roles; routine roles are declining. A team approach reduces anxiety and shows you value collaboration when change is happening.',
          megatrendConcept: 'Technology is driving workplace flexibility and new job roles; routine roles are declining.',
          why: 'A team-led approach supports adoption and shows you don’t leave people behind.',
          skillBuilt: 'This choice builds Teamwork and Communication.',
          skillPoints: { teamwork: 2, communication: 2, timeManagement: -1 },
          oneLiner: 'Teams that learn together adapt better to technology change.',
          skills: ['teamwork', 'communication']
        },
        {
          id: 'training-first',
          text: 'Ask for formal training or support material first, then offer to help others once you’re confident.',
          consequence: 'Your supervisor looks relieved someone said it. You get the manual and a quiet afternoon. By week’s end you’re helping others without the deer-in-headlights feeling—and you didn’t have to fake it.',
          tradeOff: 'Trade-off: you waited before stepping up, so you built less time management in the short term—but you avoided winging it and built real confidence.',
          feedback: 'Upskilling in new systems is essential as technology changes work. Asking for training first shows responsibility and problem-solving; learning then helping others aligns with how work is changing.',
          megatrendConcept: 'Upskilling in new systems is essential as technology changes work and some tasks are automated.',
          why: 'Asking for training first shows responsibility and models seeking support when things change.',
          skillBuilt: 'This choice builds Problem-solving and Communication.',
          skillPoints: { problemSolving: 2, communication: 1, timeManagement: -1 },
          oneLiner: 'Knowing when to ask for training is a key part of digital literacy.',
          skills: ['problemSolving', 'criticalThinking', 'communication']
        }
      ]
    },
    {
      id: 'climate-landscaping',
      megatrend: 'climate',
      title: 'Impact of climate change — small firm',
      titleLarge: 'Impact of climate change — large organisation',
      story: 'You’re on placement with a local landscaping business. Council has just made sustainable practices mandatory for new tenders—native planting, water-efficient design, the lot. The first big tender deadline is in six weeks. The owner is stressed: "If we don’t get this right we’re locked out of the big contracts." One senior staff member reckons it’s "green tape nonsense." You’ve been asked what the business could do.',
      storyLarge: 'You’re with a large construction company. A major project is on hold until they can show emissions reduction and land rehabilitation. The client is in on Friday and your manager is under pressure. "Give me something we can actually do," she says.',
      prompt: 'What do you do?',
      choices: [
        {
          id: 'research-options',
          text: 'Research sustainable practices and certification options, then present a short summary of benefits and costs.',
          consequence: 'You bring back a one-pager with real numbers. The owner stops scrolling and actually reads it. The "green tape" sceptic still grumbles—but he can’t argue with the tender requirements. You’re asked to present to the whole team next week.',
          feedback: 'Climate change is driving demand for sustainable practices and new roles in green jobs. Research helps the business decide and shows you can contribute to environmental goals.',
          megatrendConcept: 'Climate change is driving demand for sustainable practices and new roles in green jobs.',
          why: 'Research supports informed decisions and shows you can back up ideas with evidence.',
          skillBuilt: 'This choice builds Problem-solving and Digital literacy.',
          skillPoints: { problemSolving: 2, digitalLiteracy: 2 },
          oneLiner: 'Employers need people who can research and present sustainability options.',
          skills: ['problemSolving', 'digitalLiteracy']
        },
        {
          id: 'team-input',
          text: 'Suggest the team discusses how to meet the new requirements so everyone can contribute ideas.',
          consequence: 'The meeting gets heated at first—then someone suggests trialling native plants on the next small job. Another knows a supplier. By the end there’s a rough plan. The owner says it’s the first time in months the team has agreed on something.',
          feedback: 'Climate responses are changing how industries operate. Involving the team builds ownership and surfaces practical ideas for meeting environmental standards.',
          megatrendConcept: 'Climate responses are changing how industries operate and the types of jobs needed.',
          why: 'Team input builds ownership and turns resistance into ideas.',
          skillBuilt: 'This choice builds Communication and Teamwork.',
          skillPoints: { communication: 2, teamwork: 2 },
          oneLiner: 'Inclusive planning helps organisations meet sustainability targets.',
          skills: ['communication', 'teamwork']
        },
        {
          id: 'pilot-certification',
          text: 'Propose the business starts with one certification or tender requirement and reviews the results before going further.',
          consequence: 'The owner likes that it’s not "all or nothing." You pick one certification and a timeline to review. Three months later they’ve got the first tender in and the sceptic admits it "wasn’t as bad as I thought."',
          feedback: 'Climate change is impacting work and employment; certifications matter more. A pilot reduces risk and shows you can plan and evaluate change step by step.',
          megatrendConcept: 'Climate change is impacting work environments and types of employment; certifications matter more.',
          why: 'A pilot reduces risk and shows you can plan change in stages.',
          skillBuilt: 'This choice builds Enterprising behaviours and Problem-solving.',
          skillPoints: { timeManagement: 2, problemSolving: 2 },
          oneLiner: 'Piloting change is a practical way to build sustainability into work.',
          skills: ['timeManagement', 'problemSolving']
        }
      ]
    },
    {
      id: 'demographics-aged-care',
      megatrend: 'demographics',
      title: 'Impact of demographic shifts — small organisation',
      titleLarge: 'Impact of demographic shifts — large organisation',
      story: 'You’re on placement with a community aged-care and NDIS provider. They’re short-staffed, clients are from all sorts of backgrounds, and two good workers just left because the rosters "didn’t work with life." They’ve just lost another to a competitor. Your supervisor is exhausted: "We need to do something different or we’ll lose more." She’s asking how you could help make things more inclusive and flexible.',
      storyLarge: 'You’re with a large health and care provider. They’re struggling to recruit and retain in aged-care and disability; the execs keep talking about "workforce of the future" but frontline managers are drowning. Head office is watching this region. Your manager says: "I need ideas that actually work on the ground, not another policy doc."',
      prompt: 'What do you do?',
      choices: [
        {
          id: 'flexible-roster',
          text: 'Offer to work flexibly (e.g. split shifts or variable hours) and help document clear roster expectations for the team.',
          consequence: 'You put your hand up for the awkward shifts and help turn the roster into something people can actually read. One colleague says it’s the first time she’s known her hours more than a week ahead. Your supervisor uses your draft in the next retention meeting.',
          feedback: 'Demographic shifts increase demand for flexible work. Offering flexibility and clear rosters helps the team and shows you understand changing work patterns.',
          megatrendConcept: 'Demographic shifts increase demand for health-care and aged-care jobs and flexible work arrangements.',
          why: 'Clear rosters and flexibility help retain staff and show you get real-world constraints.',
          skillBuilt: 'This choice builds Teamwork and Communication.',
          skillPoints: { teamwork: 2, communication: 1 },
          oneLiner: 'Flexible work arrangements help retain staff in care and support roles.',
          skills: ['teamwork', 'communication']
        },
        {
          id: 'cultural-sensitivity',
          text: 'Volunteer to help organise or take part in cultural sensitivity training and to share what you learn with colleagues.',
          consequence: 'You join the training and then run a short debrief for the team. One client’s family later thanks the service for "getting it" at a difficult time. Your supervisor puts you forward to help with the next CALD-awareness session.',
          feedback: 'Demographic shifts are shaping more inclusive workplaces. Cultural sensitivity supports CALD clients and builds a team that can respond to diversity.',
          megatrendConcept: 'Demographic shifts are shaping more inclusive workplaces and demand for cultural awareness.',
          why: 'Stepping up on cultural awareness shows initiative and time management and supports better care.',
          skillBuilt: 'This choice builds Communication and Enterprising behaviours.',
          skillPoints: { communication: 2, timeManagement: 2 },
          oneLiner: 'Cross-cultural skills are valued in diverse workplaces and care sectors.',
          skills: ['communication', 'timeManagement']
        },
        {
          id: 'suggest-retention',
          text: 'Suggest the team discusses what would help retain staff (e.g. inclusive policies, work/life balance) and offer to help draft ideas.',
          consequence: 'The discussion gets real—people say what would actually help. You draft a one-pager of "what we could try." Management takes three of the ideas and pilots them. Six months later, turnover in your area drops. Someone remembers it started with that conversation.',
          feedback: 'Organisations need inclusive policies to retain staff. Discussing retention shows you think about the bigger picture and practical solutions.',
          megatrendConcept: 'Workplaces that fail to offer inclusive, flexible arrangements are declining in relevance.',
          why: 'Surfacing real issues and drafting ideas shows problem-solving and communication.',
          skillBuilt: 'This choice builds Problem-solving and Communication.',
          skillPoints: { problemSolving: 2, communication: 2 },
          oneLiner: 'Inclusive policies help organisations attract and keep staff in care roles.',
          skills: ['problemSolving', 'criticalThinking', 'communication']
        }
      ]
    },
    {
      id: 'economic-retailer',
      megatrend: 'economic',
      title: 'Impact of economic power shifts — small firm',
      titleLarge: 'Impact of economic power shifts — large organisation',
      story: 'You work part-time at an independent gift shop. Online giants and cheap overseas sellers are eating into sales; the owner has had a few "what’s the point" moments. She’s meeting the bank next month and needs a story to tell. "You’re the one who actually shops online," she says. "What would you do?"',
      storyLarge: 'You’re on placement with a big agribusiness that exports to Asia-Pacific. Trade rules keep shifting and one key market just got harder. The board wants a response by quarter’s end. Your manager needs people who can think about new markets and different ways of working. "Give me something we can take upstairs," she says.',
      prompt: 'What do you do?',
      choices: [
        {
          id: 'local-niche',
          text: 'Suggest focusing on localised or niche value (e.g. Australian-made, WA-sourced or sustainable products) and a strong in-store experience.',
          consequence: 'The owner likes that it’s "something we can actually do." She trials a "WA makers" corner and better in-store events. Foot traffic picks up; a few customers say they came in because they "wanted something that wasn’t from a warehouse." She starts asking your opinion on new lines.',
          feedback: 'Economic power shifts increase global competition; local and niche value can differentiate. Focusing on that helps the business compete and shows strategic thinking.',
          megatrendConcept: 'Economic power shifts bring more global competition; local and niche value can differentiate firms.',
          why: 'Local and niche positioning gives the business a clear story and shows you think about strategy.',
          skillBuilt: 'This choice builds Communication and Problem-solving.',
          skillPoints: { communication: 2, problemSolving: 1 },
          oneLiner: 'Local and niche positioning helps businesses compete in a global market.',
          skills: ['criticalThinking', 'communication']
        },
        {
          id: 'online-niche',
          text: 'Suggest exploring global shipping or online sales to niche markets if the business can build digital capability.',
          consequence: 'It’s a stretch—the owner isn’t tech-first—but she lets you help set up a simple online store for a few hero products. First overseas order comes in and she takes a screenshot. "We’re not just Main Street anymore," she says. You get asked to train another staff member on the system.',
          feedback: 'Economic power shifts increase demand for digital and global skills. Exploring online options shows time management and digital literacy.',
          megatrendConcept: 'Economic power shifts increase demand for digital collaboration and global market skills.',
          why: 'Pushing for digital and global options shows initiative and helps the business adapt.',
          skillBuilt: 'This choice builds Digital literacy and Enterprising behaviours.',
          skillPoints: { digitalLiteracy: 2, timeManagement: 2 },
          oneLiner: 'Digital capability opens global and niche market opportunities.',
          skills: ['digitalLiteracy', 'timeManagement']
        },
        {
          id: 'research-trends',
          text: 'Offer to research changing consumer trends influenced by global fashion, pricing and branding, and present findings to the team.',
          consequence: 'You bring back a short report and a few examples of what similar small businesses are doing. The owner says it’s the first time she’s seen "the competition" in one place. She uses it in the next planning meeting—and credits you in front of the team.',
          feedback: 'Firms must respond to changing consumer trends. Research helps the business adapt and shows you can use problem-solving and digital tools.',
          megatrendConcept: 'Firms must respond to changing consumer trends and global influences.',
          why: 'Research supports informed decisions and shows you can turn information into action.',
          skillBuilt: 'This choice builds Problem-solving and Digital literacy.',
          skillPoints: { problemSolving: 2, digitalLiteracy: 2 },
          oneLiner: 'Understanding trends helps businesses respond to economic and market change.',
          skills: ['problemSolving', 'digitalLiteracy']
        }
      ]
    },
    {
      id: 'diversity-workplace',
      megatrend: 'demographics',
      title: 'Working with diversity',
      titleLarge: 'Working with diversity',
      story: 'Your workplace is a mix of cultures, ages and backgrounds—but it doesn’t always feel like everyone’s voice is in the room. A couple of people have said they don’t feel heard; your manager has been asked to "do something about inclusion" and is not sure where to start. She turns to you: "You’re in the mix. What would actually help?"',
      storyLarge: 'You’re in a large organisation that talks a lot about diversity—but in your team, the same people still do most of the talking in meetings. Your manager wants to change that. "I need ideas that don’t feel like a tick-box," she says. "What would you do?"',
      prompt: 'What do you do?',
      choices: [
        {
          id: 'cultural-celebrations',
          text: 'Suggest one internal strategy (e.g. acknowledgement of country at meetings, or a multicultural food day) and offer to help organise it.',
          consequence: 'You get the go-ahead for a simple Acknowledgement of Country at the next team meeting and help organise a shared lunch. It feels a bit awkward at first—then someone says it’s the first time they’ve seen their culture mentioned in the room. Your manager asks you to help with the next event.',
          feedback: 'Demographic shifts and diversity require inclusive practices. Strategies like acknowledgement of country and shared events build belonging.',
          megatrendConcept: 'Demographic shifts and diversity require inclusive practices and cultural awareness at work.',
          why: 'Organising something concrete shows you value inclusion and can bring people together.',
          skillBuilt: 'This choice builds Communication and Teamwork.',
          skillPoints: { communication: 2, teamwork: 2 },
          oneLiner: 'Cultural celebrations help build inclusive and respectful workplaces.',
          skills: ['communication', 'teamwork']
        },
        {
          id: 'new-perspectives',
          text: 'Suggest the team runs a short brainstorming session where everyone is encouraged to contribute, including ideas that challenge the usual way of doing things.',
          consequence: 'The session runs—and the twist? The quietest person in the room suggests the idea that everyone ends up backing. The usual "loud voice" is the one who has to learn to step back. Your manager says it’s the most useful meeting she’s had in months. You’re asked to help design the next one.',
          feedback: 'Diverse teams benefit when all voices are heard. Inclusive brainstorming leads to better ideas and supports inclusive leadership.',
          megatrendConcept: 'Diverse teams benefit from inclusive structures where all voices are heard.',
          why: 'Creating space for everyone improves decisions and shows time management and inclusive behaviour.',
          skillBuilt: 'This choice builds Communication and Enterprising behaviours.',
          skillPoints: { communication: 1, timeManagement: 2 },
          oneLiner: 'Inclusive brainstorming helps teams innovate and adapt.',
          skills: ['communication', 'criticalThinking', 'timeManagement']
        },
        {
          id: 'cross-cultural-skills',
          text: 'Offer to develop your cross-cultural communication skills and to help others recognise and respect cultural diversity.',
          consequence: 'You do some reading and share a few simple "do’s and don’ts" with the team—nothing preachy, just practical. Someone later says it helped them avoid a misunderstanding with a client. Your manager adds it to the induction pack for new starters.',
          feedback: 'Demographic shifts increase demand for cross-cultural skills. Developing and sharing them shows time management and supports the whole team.',
          megatrendConcept: 'Demographic shifts increase demand for cross-cultural skills and inclusive leadership.',
          why: 'Stepping up on cross-cultural skills shows initiative and helps everyone work better together.',
          skillBuilt: 'This choice builds Communication and Enterprising behaviours.',
          skillPoints: { communication: 2, timeManagement: 2 },
          oneLiner: 'Cross-cultural communication is valued in diverse and global workplaces.',
          skills: ['communication', 'timeManagement']
        }
      ]
    }
  ];

  let state = {
    currentIndex: 0,
    selectedChoice: null,
    usedSkills: new Set(),
    usedMegatrends: new Set(),
    megatrendOrderIndex: 0,
    quizQuestionIndex: 0,
    quizAnswers: {},
    quizScore: { correct: 0, total: 0, shortAnswerOk: false },
    orgContext: 'small',
    skillScores: { communication: 0, teamwork: 0, problemSolving: 0, digitalLiteracy: 0, criticalThinking: 0, timeManagement: 0 },
    choicesByMegatrend: { tech: [], climate: [], demographics: [], economic: [], diversity: [] },
    lastDeltas: [],
    firstMegatrendPassed: false
  };

  const $ = (id) => document.getElementById(id);
  const show = (id) => {
    const el = $(id);
    if (el) {
      el.hidden = false;
      el.scrollTop = 0;
    }
  };
  const hide = (id) => { const el = $(id); if (el) el.hidden = true; };

  function hideAllScreens() {
    ['tap-to-begin', 'intro-1', 'intro-2', 'start', 'welcome-1', 'welcome-2', 'welcome-3', 'welcome-4', 'intel', 'quiz', 'quiz-result', 'scenario', 'feedback', 'summary', 'report'].forEach(hide);
  }

  function showTapToBegin() {
    hideAllScreens();
    show('tap-to-begin');
    hide('context-strip');
    hide('global-progress');
    window.scrollTo(0, 0);
  }

  function showIntro1() {
    hideAllScreens();
    show('intro-1');
    hide('context-strip');
    hide('global-progress');
    window.scrollTo(0, 0);
    var voiceover = document.getElementById('intro-1-voiceover');
    if (voiceover) {
      voiceover.currentTime = 0;
      voiceover.volume = 1;
      voiceover.muted = false;
      voiceover.play().catch(function () {});
      window._intro1VoiceoverStop = setTimeout(function () {
        voiceover.pause();
        voiceover.currentTime = 0;
      }, 4000);
    }
  }

  function showIntro2() {
    hideAllScreens();
    show('intro-2');
    hide('context-strip');
    hide('global-progress');
    window.scrollTo(0, 0);
    var voiceover = document.getElementById('intro-2-voiceover');
    if (voiceover) {
      voiceover.currentTime = 0;
      voiceover.volume = 1;
      voiceover.muted = false;
      voiceover.play().catch(function () {});
      window._intro2VoiceoverStop = setTimeout(function () {
        voiceover.pause();
        voiceover.currentTime = 0;
      }, 4000);
    }
  }

  function showStart() {
    hideAllScreens();
    show('start');
    hide('context-strip');
    hide('global-progress');
  }

  function showWelcome() {
    hideAllScreens();
    show('welcome-1');
    hide('context-strip');
    hide('global-progress');
    window.scrollTo(0, 0);
    var video = document.getElementById('welcome-question-video');
    var voiceover = document.getElementById('welcome-question-voiceover');
    if (video) {
      video.currentTime = 0;
      video.muted = true;
      video.load();
      var playVideo = function () { video.play().catch(function () {}); };
      if (video.readyState >= 2) {
        playVideo();
      } else {
        video.addEventListener('canplay', playVideo, { once: true });
        setTimeout(playVideo, 300);
      }
    }
    if (voiceover) {
      voiceover.currentTime = 0;
      voiceover.volume = 1;
      voiceover.muted = false;
      voiceover.play().catch(function () {});
    }
  }

  function startDecliningVideo() {
    var v = document.getElementById('welcome-question-video');
    var vo = document.getElementById('welcome-question-voiceover');
    if (v) { v.pause(); v.currentTime = 0; }
    if (vo) { vo.pause(); vo.currentTime = 0; }
    hide('welcome-1');
    show('welcome-2');
    window.scrollTo(0, 0);
    var decliningVideo = document.getElementById('welcome-declining-video');
    var decliningVoiceover = document.getElementById('welcome-declining-voiceover');
    function syncAndPlayDeclining() {
      var vDur = decliningVideo && decliningVideo.duration;
      var aDur = decliningVoiceover && decliningVoiceover.duration;
      if (decliningVideo && decliningVoiceover && vDur > 0 && aDur > 0 && isFinite(vDur) && isFinite(aDur)) {
        decliningVideo.playbackRate = vDur / aDur;
        decliningVideo.play().catch(function () {});
        decliningVoiceover.play().catch(function () {});
      }
    }
    if (decliningVideo) {
      decliningVideo.currentTime = 0;
      decliningVideo.muted = true;
      decliningVideo.load();
      decliningVideo.addEventListener('loadedmetadata', syncAndPlayDeclining, { once: true });
      decliningVideo.addEventListener('canplay', syncAndPlayDeclining, { once: true });
    }
    if (decliningVoiceover) {
      decliningVoiceover.currentTime = 0;
      decliningVoiceover.volume = 1;
      decliningVoiceover.muted = false;
      decliningVoiceover.addEventListener('loadedmetadata', syncAndPlayDeclining, { once: true });
      decliningVoiceover.addEventListener('canplay', syncAndPlayDeclining, { once: true });
      decliningVoiceover.load();
    }
    setTimeout(syncAndPlayDeclining, 300);
  }

  function startEmergingVideo() {
    var v = document.getElementById('welcome-declining-video');
    var vo = document.getElementById('welcome-declining-voiceover');
    if (v) { v.pause(); v.currentTime = 0; }
    if (vo) { vo.pause(); vo.currentTime = 0; }
    hide('welcome-2');
    show('welcome-3');
    window.scrollTo(0, 0);
    var emergingVideo = document.getElementById('welcome-emerging-video');
    var emergingVoiceover = document.getElementById('welcome-emerging-voiceover');
    function syncAndPlayEmerging() {
      var vDur = emergingVideo && emergingVideo.duration;
      var aDur = emergingVoiceover && emergingVoiceover.duration;
      if (emergingVideo && emergingVoiceover && vDur > 0 && aDur > 0 && isFinite(vDur) && isFinite(aDur)) {
        emergingVideo.playbackRate = vDur / aDur;
        emergingVideo.play().catch(function () {});
        emergingVoiceover.play().catch(function () {});
      }
    }
    if (emergingVideo) {
      emergingVideo.currentTime = 0;
      emergingVideo.muted = true;
      emergingVideo.load();
      emergingVideo.addEventListener('loadedmetadata', syncAndPlayEmerging, { once: true });
      emergingVideo.addEventListener('canplay', syncAndPlayEmerging, { once: true });
    }
    if (emergingVoiceover) {
      emergingVoiceover.currentTime = 0;
      emergingVoiceover.volume = 1;
      emergingVoiceover.muted = false;
      emergingVoiceover.addEventListener('loadedmetadata', syncAndPlayEmerging, { once: true });
      emergingVoiceover.addEventListener('canplay', syncAndPlayEmerging, { once: true });
      emergingVoiceover.load();
    }
    setTimeout(syncAndPlayEmerging, 300);
  }

  function updateContextStrip() {
    const strip = $('context-strip');
    if (!strip) return;
    strip.textContent = state.orgContext === 'large' ? 'Playing as: Large organisation' : 'Playing as: Small or local organisation';
    strip.hidden = false;
  }

  function updateProgress(stage) {
    const wrap = $('global-progress');
    const megEl = $('progress-megatrends');
    const stageEl = $('progress-stage');
    if (!wrap || !megEl) return;
    wrap.hidden = false;
    megEl.innerHTML = MEGATREND_ORDER.map((key, i) => {
      const label = MEGATRENDS[key].label;
      const done = state.megatrendOrderIndex > i || (state.megatrendOrderIndex === i && stage === 'scenario');
      const current = (stage === 'quiz' || stage === 'scenario' || stage === 'intel') && state.megatrendOrderIndex === i;
      let c = 'pill ' + MEGATRENDS[key].class;
      if (done) c += ' done';
      if (current) c += ' current';
      return '<span class="' + c + '">' + label + '</span>';
    }).join('');
    stageEl.textContent = stage === 'quiz' ? 'Quiz' : stage === 'scenario' ? 'Scenario' : stage === 'intel' ? 'Briefing' : (stage && stage.startsWith('welcome')) ? 'Intro' : '';
  }

  function saveState() {
    try {
      const payload = {
        v: 1,
        orgContext: state.orgContext,
        megatrendOrderIndex: state.megatrendOrderIndex,
        quizQuestionIndex: state.quizQuestionIndex,
        quizAnswers: state.quizAnswers,
        currentIndex: state.currentIndex,
        skillScores: state.skillScores,
        choicesByMegatrend: state.choicesByMegatrend,
        usedMegatrends: Array.from(state.usedMegatrends),
        firstMegatrendPassed: state.firstMegatrendPassed
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (e) {}
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (!data || data.v !== 1) return null;
      state.orgContext = data.orgContext || 'small';
      state.megatrendOrderIndex = data.megatrendOrderIndex || 0;
      state.quizQuestionIndex = data.quizQuestionIndex || 0;
      state.quizAnswers = data.quizAnswers || {};
      state.currentIndex = data.currentIndex || 0;
      state.skillScores = data.skillScores || { communication: 0, teamwork: 0, problemSolving: 0, digitalLiteracy: 0, criticalThinking: 0, timeManagement: 0 };
      state.choicesByMegatrend = data.choicesByMegatrend || { tech: [], climate: [], demographics: [], economic: [], diversity: [] };
      state.usedMegatrends = new Set(data.usedMegatrends || []);
      state.firstMegatrendPassed = data.firstMegatrendPassed === true;
      return data;
    } catch (e) { return null; }
  }

  function clearSavedProgress() {
    state.firstMegatrendPassed = false;
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
  }

  function getCurrentMegatrend() {
    return MEGATREND_ORDER[state.megatrendOrderIndex];
  }

  function getScenarioIndexForMegatrend(megatrendKey) {
    if (megatrendKey === 'diversity') return 4;
    const i = MEGATREND_ORDER.indexOf(megatrendKey);
    return i >= 0 ? i : 0;
  }

  function showIntel(megatrendKey) {
    hideAllScreens();
    show('intel');
    updateContextStrip();
    updateProgress('intel');
    state.megatrendOrderIndex = megatrendKey === 'diversity' ? 4 : MEGATREND_ORDER.indexOf(megatrendKey);
    if (state.megatrendOrderIndex < 0) state.megatrendOrderIndex = 0;

    const megatrend = MEGATRENDS[megatrendKey] || MEGATRENDS.tech;
    const feed = INTEL_FEED[megatrendKey] || INTEL_FEED.tech;
    $('intel-badge').textContent = megatrend.label;
    $('intel-badge').className = 'badge badge--scenario ' + megatrend.class;

    const list = $('intel-list');
    list.innerHTML = '';
    feed.forEach(function (item) {
      const li = document.createElement('li');
      li.className = 'intel-item intel-item--' + item.type;
      if (item.type === 'image') {
        const title = document.createElement('strong');
        title.className = 'intel-item__title';
        title.textContent = item.title;
        li.appendChild(title);
        const wrap = document.createElement('div');
        wrap.className = 'intel-video-wrap';
        const img = document.createElement('img');
        img.className = 'intel-image';
        img.src = item.imageSrc;
        img.alt = item.title;
        const audio = document.createElement('audio');
        audio.className = 'intel-voiceover';
        audio.preload = 'auto';
        const audioSrc = document.createElement('source');
        audioSrc.src = item.voiceoverSrc;
        audioSrc.type = 'audio/mpeg';
        audio.appendChild(audioSrc);
        wrap.appendChild(img);
        wrap.appendChild(audio);
        const playBtn = document.createElement('button');
        playBtn.type = 'button';
        playBtn.className = 'btn btn--secondary intel-video-play';
        playBtn.textContent = 'Play';
        playBtn.setAttribute('aria-label', 'Play ' + item.title);
        wrap.appendChild(playBtn);
        li.appendChild(wrap);
        list.appendChild(li);

        audio.currentTime = 0;
        audio.load();

        playBtn.addEventListener('click', function () {
          audio.currentTime = 0;
          audio.play().catch(function () {});
        });
        return;
      }
      const title = document.createElement('strong');
      title.className = 'intel-item__title';
      title.textContent = item.title;
      const body = document.createElement('p');
      body.className = 'intel-item__body';
      body.textContent = item.body;
      li.appendChild(title);
      li.appendChild(body);
      list.appendChild(li);
    });

    $('btn-intel-continue').onclick = function () {
      list.querySelectorAll('video').forEach(function (v) { v.pause(); v.currentTime = 0; });
      list.querySelectorAll('audio').forEach(function (a) { a.pause(); a.currentTime = 0; });
      state.usedMegatrends.add(megatrendKey);
      saveState();
      showScenario(getScenarioIndexForMegatrend(megatrendKey));
    };
  }

  function showQuiz(megatrendKey, resume) {
    hideAllScreens();
    show('quiz');
    if (!resume) {
      state.quizQuestionIndex = 0;
      state.quizAnswers = {};
    }
    state.quizScore = { correct: 0, total: 0, shortAnswerOk: false };
    updateContextStrip();
    updateProgress('quiz');
    $('quiz-prev').onclick = () => goQuizPrev(megatrendKey);
    $('quiz-next').onclick = () => goQuizNext(megatrendKey);
    renderQuizQuestion(megatrendKey);
  }

  function renderQuizQuestion(megatrendKey) {
    const quiz = QUIZZES[megatrendKey];
    const questions = quiz.questions;
    const qIndex = state.quizQuestionIndex;
    const q = questions[qIndex];
    const megatrend = MEGATRENDS[megatrendKey];

    $('quiz-badge').textContent = quiz.label;
    $('quiz-badge').className = 'badge badge--scenario ' + megatrend.class;
    $('quiz-progress-text').textContent = 'Question ' + (qIndex + 1) + ' of ' + questions.length;
    $('quiz-command').textContent = q.commandVerb;
    $('quiz-question').textContent = q.question;

    const optionsEl = $('quiz-options');
    const shortEl = $('quiz-shortanswer');
    optionsEl.hidden = true;
    shortEl.hidden = true;
    optionsEl.innerHTML = '';

    if (q.type === 'multichoice') {
      optionsEl.hidden = false;
      q.options.forEach((opt, i) => {
        const label = document.createElement('label');
        label.className = 'quiz-option';
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'quiz-choice';
        radio.value = String(i);
        radio.checked = state.quizAnswers['q' + qIndex] === String(i);
        label.appendChild(radio);
        label.appendChild(document.createTextNode(' ' + opt));
        optionsEl.appendChild(label);
      });
    } else {
      shortEl.hidden = false;
      shortEl.placeholder = q.placeholder || 'Type your answer (use unit keywords).';
      shortEl.value = state.quizAnswers['q' + qIndex] || '';
    }

    $('quiz-prev').hidden = qIndex === 0;
    $('quiz-next').textContent = qIndex === questions.length - 1 ? 'Submit quiz' : 'Next question';
  }

  function goQuizPrev(megatrendKey) {
    if (state.quizQuestionIndex > 0) {
      saveQuizAnswer(megatrendKey, state.quizQuestionIndex);
      state.quizQuestionIndex--;
      renderQuizQuestion(megatrendKey);
    }
  }

  function saveQuizAnswer(megatrendKey, qIndex) {
    const q = QUIZZES[megatrendKey].questions[qIndex];
    if (q.type === 'multichoice') {
      const selected = document.querySelector('input[name="quiz-choice"]:checked');
      if (selected) state.quizAnswers['q' + qIndex] = selected.value;
    } else {
      const val = $('quiz-shortanswer').value.trim();
      state.quizAnswers['q' + qIndex] = val;
    }
  }

  function goQuizNext(megatrendKey) {
    saveQuizAnswer(megatrendKey, state.quizQuestionIndex);
    const questions = QUIZZES[megatrendKey].questions;
    if (state.quizQuestionIndex < questions.length - 1) {
      state.quizQuestionIndex++;
      renderQuizQuestion(megatrendKey);
    } else {
      submitQuiz(megatrendKey);
    }
  }

  function submitQuiz(megatrendKey) {
    const questions = QUIZZES[megatrendKey].questions;
    let correct = 0;
    let total = 0;
    let shortAnswerOk = false;
    questions.forEach((q, i) => {
      const ans = state.quizAnswers['q' + i];
      if (q.type === 'multichoice') {
        total++;
        if (ans === String(q.correctIndex)) correct++;
      } else {
        shortAnswerOk = (ans && ans.length >= (q.minLength || SHORT_ANSWER_MIN_LENGTH));
      }
    });
    state.quizScore = { correct, total, shortAnswerOk };
    const pct = total > 0 ? Math.round((correct / total) * 100) : 0;
    const passed = (total > 0 && pct >= QUIZ_PASS_PERCENT) && shortAnswerOk;

    hideAllScreens();
    show('quiz-result');
    updateContextStrip();
    $('quiz-result-badge').textContent = QUIZZES[megatrendKey].label;
    $('quiz-result-badge').className = 'badge badge--scenario ' + MEGATRENDS[megatrendKey].class;
    $('quiz-result-score').textContent = 'You scored ' + correct + ' out of ' + total + ' multiple choice questions' +
      (shortAnswerOk ? ', and you completed the short answer.' : ', but the short answer was too short (use unit keywords and explain in your own words).');
    $('quiz-result-pct').textContent = 'Multiple choice: ' + pct + '%. You need ' + QUIZ_PASS_PERCENT + '% and a completed short answer to unlock the scenario.';
    $('quiz-result-passed').hidden = !passed;
    $('quiz-result-failed').hidden = passed;
    const isFirstMegatrend = state.megatrendOrderIndex === 0;
    const continueBtn = $('btn-quiz-continue');
    const passedMsg = $('quiz-result-passed');
    if (passedMsg) {
      passedMsg.textContent = isFirstMegatrend && passed
        ? "You've passed the content learning. Click Continue to scenario to begin your first scenario."
        : 'You have unlocked the scenario. Click Continue to scenario to apply your understanding in a decision.';
    }
    continueBtn.textContent = 'Continue to scenario';
    if (isFirstMegatrend && passed) {
      state.firstMegatrendPassed = true;
      saveState();
    }
    $('btn-quiz-retry').onclick = () => showQuiz(megatrendKey);
    continueBtn.onclick = () => {
      if (passed) {
        state.usedMegatrends.add(megatrendKey);
        saveState();
        if (isFirstMegatrend) {
          showStart();
        } else {
          showScenario(state.megatrendOrderIndex);
        }
      }
    };
  }

  function getMegatrendKeyForScenarioIndex(index) {
    if (index <= 3) return MEGATREND_ORDER[index];
    return 'diversity';
  }

  function showScenario(index) {
    hideAllScreens();
    show('scenario');
    state.currentIndex = index;
    state.selectedChoice = null;
    updateContextStrip();
    updateProgress('scenario');

    const s = SCENARIOS[index];
    const total = SCENARIOS.length;
    const megatrend = MEGATRENDS[s.megatrend];

    $('scenario-num').textContent = index + 1;
    $('scenario-total').textContent = total;
    $('progress-fill').style.width = ((index + 1) / total) * 100 + '%';
    $('scenario').querySelector('.progress-bar').setAttribute('aria-valuenow', Math.round(((index + 1) / total) * 100));

    const contextEl = $('scenario-context');
    if (contextEl) {
      contextEl.textContent = 'Your placement · ' + megatrend.label;
      contextEl.hidden = false;
    }
    $('scenario-badge').textContent = megatrend.label;
    $('scenario-badge').className = 'badge badge--scenario ' + megatrend.class;
    const title = (state.orgContext === 'large' && s.titleLarge) ? s.titleLarge : s.title;
    const storyText = (state.orgContext === 'large' && s.storyLarge) ? s.storyLarge : s.story;
    $('scenario-title').textContent = title;
    const storyEl = $('scenario-story');
    storyEl.innerHTML = storyText.split(/\n\n+/).map(block => '<p>' + block.replace(/\n/g, ' ').trim() + '</p>').join('');

    const list = $('choices-list');
    list.innerHTML = '';
    s.choices.forEach((choice, i) => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'choice-btn';
      btn.textContent = choice.text;
      btn.dataset.choiceIndex = String(i);
      btn.addEventListener('click', () => selectChoice(index, i));
      li.appendChild(btn);
      list.appendChild(li);
    });
  }

  function applySkillPoints(skillPoints) {
    if (!skillPoints) return;
    state.lastDeltas = [];
    DASHBOARD_SKILL_KEYS.forEach(sk => {
      const delta = skillPoints[sk] || 0;
      if (delta === 0) return;
      const current = state.skillScores[sk] || 0;
      state.skillScores[sk] = Math.max(0, Math.min(MAX_SKILL_POINTS, current + delta));
      state.lastDeltas.push({ skill: sk, delta });
    });
  }

  function skillIconImg(skillKey) {
    const src = SKILL_IMAGES[skillKey];
    return src ? '<img class="skill-meter__icon skill-meter__img" src="' + src + '" alt="" aria-hidden="true">' : '';
  }

  function renderDashboardMini(parentId) {
    const el = $(parentId);
    if (!el) return;
    const total = DASHBOARD_SKILL_KEYS.reduce((sum, k) => sum + (state.skillScores[k] || 0), 0);
    let html = '<div class="dashboard-total">Total Employability Score: ' + total + '</div>';
    DASHBOARD_SKILL_KEYS.forEach(k => {
      const v = state.skillScores[k] || 0;
      const pct = Math.min(100, (v / MAX_SKILL_POINTS) * 100);
      html += '<div class="skill-meter">' + skillIconImg(k) + '<span class="skill-meter__label">' + SKILLS[k] + '</span> ' + v + '/' + MAX_SKILL_POINTS + '<div class="skill-meter__bar"><div class="skill-meter__fill" style="width:' + pct + '%"></div></div></div>';
    });
    el.innerHTML = html;
  }

  function selectChoice(scenarioIndex, choiceIndex) {
    if (state.selectedChoice !== null) return;
    state.selectedChoice = choiceIndex;

    const s = SCENARIOS[scenarioIndex];
    const choice = s.choices[choiceIndex];
    const megatrend = MEGATRENDS[s.megatrend];
    const megatrendKey = getMegatrendKeyForScenarioIndex(scenarioIndex);

    choice.skills.forEach(sk => state.usedSkills.add(sk));
    state.usedMegatrends.add(s.megatrend);
    applySkillPoints(choice.skillPoints);
    if (!state.choicesByMegatrend[megatrendKey]) state.choicesByMegatrend[megatrendKey] = [];
    state.choicesByMegatrend[megatrendKey].push({ title: s.title, choiceText: choice.text });

    $('feedback-badge').textContent = megatrend.label;
    $('feedback-badge').className = 'badge badge--scenario ' + megatrend.class;
    $('feedback-title').textContent = 'What happened next';
    const consequenceEl = $('feedback-consequence');
    if (consequenceEl) {
      consequenceEl.textContent = choice.consequence || '';
      consequenceEl.hidden = !choice.consequence;
    }
    $('feedback-megatrend').innerHTML = choice.megatrendConcept ? '<strong>Megatrend</strong> ' + choice.megatrendConcept : '';
    $('feedback-why').innerHTML = choice.why ? '<strong>Why this helps</strong> ' + choice.why : '';
    $('feedback-skill-built').innerHTML = choice.skillBuilt ? '<strong>Skill built</strong> ' + choice.skillBuilt : '';
    const skillsEl = $('feedback-skills');
    skillsEl.innerHTML = '<span class="feedback-skills-label">Skills used:</span> ' +
      choice.skills.map(sk => {
      const src = SKILL_IMAGES[sk];
      const icon = src ? '<img class="pill__icon" src="' + src + '" alt="" aria-hidden="true">' : '';
      return '<span class="pill pill--skill">' + icon + SKILLS[sk] + '</span>';
    }).join(' ');
    const deltasEl = $('feedback-deltas');
    deltasEl.innerHTML = state.lastDeltas.length ? state.lastDeltas.map(d => {
      const sign = d.delta > 0 ? '+' : '';
      const cls = d.delta < 0 ? 'delta delta--negative' : 'delta';
      return '<span class="' + cls + '">' + skillIconImg(d.skill) + ' ' + sign + d.delta + ' ' + SKILLS[d.skill] + '</span>';
    }).join(' ') : '';
    const tradeOffEl = $('feedback-tradeoff');
    if (tradeOffEl) {
      tradeOffEl.textContent = choice.tradeOff || '';
      tradeOffEl.hidden = !choice.tradeOff;
    }
    const reflectEl = $('feedback-reflect');
    if (reflectEl) reflectEl.hidden = scenarioIndex !== 0;
    $('feedback-one-liner').textContent = choice.oneLiner || '';
    renderDashboardMini('dashboard-mini');
    saveState();

    document.querySelectorAll('.choice-btn').forEach(function (btn) {
      btn.disabled = true;
      btn.style.opacity = '0.6';
    });
    setTimeout(function () {
      hideAllScreens();
      show('feedback');
      updateContextStrip();
      updateProgress('feedback');
    }, 400);
  }

  function showNext() {
    state.megatrendOrderIndex = state.currentIndex + 1;
    saveState();
    if (state.megatrendOrderIndex < MEGATREND_ORDER.length) {
      showIntel(MEGATREND_ORDER[state.megatrendOrderIndex]);
    } else if (state.currentIndex === 3) {
      showIntel('diversity');
    } else {
      showSummary();
    }
  }

  function showSummary() {
    hideAllScreens();
    show('summary');
    updateContextStrip();
    updateProgress('');

    const trendsList = $('summary-megatrends');
    if (trendsList) {
      trendsList.innerHTML = '';
      state.usedMegatrends.forEach(m => {
        const meg = MEGATRENDS[m];
        const li = document.createElement('li');
        li.innerHTML = '<span class="pill ' + meg.class + '">' + meg.label + '</span>';
        trendsList.appendChild(li);
      });
    }

    const skillsList = $('summary-skills');
    if (skillsList) {
      skillsList.innerHTML = '';
      state.usedSkills.forEach(sk => {
        const li = document.createElement('li');
        const src = SKILL_IMAGES[sk];
        const icon = src ? '<img class="pill__icon" src="' + src + '" alt="" aria-hidden="true">' : '';
        li.innerHTML = '<span class="pill pill--skill">' + icon + SKILLS[sk] + '</span>';
        skillsList.appendChild(li);
      });
    }
  }

  function generateAT3Draft() {
    const lines = [];
    lines.push('The four megatrends—impactful technology, climate change, demographic shifts, and economic power shifts—affect the nature of work in several ways.');
    lines.push('Work environments are changing through digitisation, remote work, sustainability requirements, inclusive and flexible practices, and global connections.');
    lines.push('Types of employment are shifting towards more flexible, tech-based, and sustainability-related roles, with growth in some areas and decline in others.');
    lines.push('Emerging jobs include roles in technology, green industries, care and support, and global trade; declining jobs include many routine and environmentally unsustainable roles.');
    lines.push('Career impact: In the next 12 months, building digital literacy and employability skills will help with entry-level roles. Over 2–5 years, understanding megatrends will support career decisions and upskilling. Five years and beyond, the ability to adapt to technological, environmental, and demographic change will be important for long-term employability.');
    return lines.join(' ');
  }

  function showReport() {
    hideAllScreens();
    show('report');
    updateContextStrip();

    renderDashboardMini('report-dashboard');

    const choicesEl = $('report-choices');
    if (choicesEl) {
      let html = '';
      MEGATREND_ORDER.forEach(key => {
        const arr = state.choicesByMegatrend[key] || [];
        if (arr.length) {
          const label = MEGATRENDS[key].label;
          html += '<div class="choice-item"><strong>' + label + '</strong><ul>';
          arr.forEach(c => { html += '<li>' + c.choiceText + '</li>'; });
          html += '</ul></div>';
        }
      });
      const div = state.choicesByMegatrend.diversity || [];
      if (div.length) {
        html += '<div class="choice-item"><strong>Working with diversity</strong><ul>';
        div.forEach(c => { html += '<li>' + c.choiceText + '</li>'; });
        html += '</ul></div>';
      }
      choicesEl.innerHTML = html || '<p>No choices recorded.</p>';
    }

    const skillsArr = DASHBOARD_SKILL_KEYS.map(k => ({ key: k, score: state.skillScores[k] || 0 }));
    skillsArr.sort((a, b) => b.score - a.score);
    const skillsSummaryEl = $('report-skills-summary');
    if (skillsSummaryEl) {
      const strongest = skillsArr.slice(0, 2).map(a => skillIconImg(a.key) + ' ' + SKILLS[a.key]).join(', ');
      const weakest = skillsArr.slice(-2).reverse().map(a => skillIconImg(a.key) + ' ' + SKILLS[a.key]).join(', ');
      skillsSummaryEl.innerHTML = '<p><strong>Strongest:</strong> ' + strongest + '</p><p><strong>Weakest (to develop):</strong> ' + weakest + '</p>';
    }
    const nextTimeEl = $('report-next-time');
    if (nextTimeEl && skillsArr.length) {
      const weakestKey = skillsArr[skillsArr.length - 1].key;
      nextTimeEl.textContent = 'Next time: see if you can raise your ' + SKILLS[weakestKey] + '. Or replay and try different choices to compare outcomes.';
    }

    const draftEl = $('report-at3-draft');
    if (draftEl) draftEl.value = generateAT3Draft();

    const reflEl = $('report-reflection');
    if (reflEl) {
      reflEl.innerHTML = REFLECTION_QUESTIONS.map((q, i) => '<li>' + q + '</li>').join('');
    }
  }

  function restart() {
    if (!confirm('Restart game? Your progress will be lost.')) return;
    state.currentIndex = 0;
    state.selectedChoice = null;
    state.usedSkills = new Set();
    state.usedMegatrends = new Set();
    state.megatrendOrderIndex = 0;
    state.quizQuestionIndex = 0;
    state.quizAnswers = {};
    state.skillScores = { communication: 0, teamwork: 0, problemSolving: 0, digitalLiteracy: 0, criticalThinking: 0, timeManagement: 0 };
    state.choicesByMegatrend = { tech: [], climate: [], demographics: [], economic: [], diversity: [] };
    state.lastDeltas = [];
    saveState();
    showStart();
  }

  document.getElementById('btn-tap-to-begin')?.addEventListener('click', function () {
    showIntro1();
  });
  $('btn-intro-1-continue')?.addEventListener('click', function () {
    if (window._intro1VoiceoverStop) {
      clearTimeout(window._intro1VoiceoverStop);
      window._intro1VoiceoverStop = null;
    }
    var v = $('intro-1-voiceover');
    if (v) { v.pause(); v.currentTime = 0; }
    showIntro2();
  });
  $('btn-intro-2-continue')?.addEventListener('click', function () {
    if (window._intro2VoiceoverStop) {
      clearTimeout(window._intro2VoiceoverStop);
      window._intro2VoiceoverStop = null;
    }
    var v = document.getElementById('intro-2-voiceover');
    if (v) { v.pause(); v.currentTime = 0; }
    showWelcome();
  });

  document.querySelector('.welcome-question-unmute')?.addEventListener('click', function () {
    var video = document.getElementById('welcome-question-video');
    if (video) {
      video.muted = false;
      this.textContent = 'Sound on';
      this.setAttribute('aria-label', 'Sound on');
    }
  });
  document.querySelector('.welcome-declining-unmute')?.addEventListener('click', function () {
    var video = document.getElementById('welcome-declining-video');
    if (video) {
      video.muted = false;
      this.textContent = 'Sound on';
      this.setAttribute('aria-label', 'Sound on');
    }
  });
  document.querySelector('.welcome-emerging-unmute')?.addEventListener('click', function () {
    var video = document.getElementById('welcome-emerging-video');
    if (video) {
      video.muted = false;
      this.textContent = 'Sound on';
      this.setAttribute('aria-label', 'Sound on');
    }
  });
  document.querySelector('.welcome-final-unmute')?.addEventListener('click', function () {
    var video = document.getElementById('welcome-final-video');
    if (video) {
      video.muted = false;
      this.textContent = 'Sound on';
      this.setAttribute('aria-label', 'Sound on');
    }
  });

  document.getElementById('btn-welcome-after-question')?.addEventListener('click', startDecliningVideo);
  document.getElementById('btn-welcome-after-declining')?.addEventListener('click', startEmergingVideo);
  document.getElementById('btn-welcome-after-emerging')?.addEventListener('click', function () {
    var v = document.getElementById('welcome-emerging-video');
    var vo = document.getElementById('welcome-emerging-voiceover');
    if (v) { v.pause(); v.currentTime = 0; }
    if (vo) { vo.pause(); vo.currentTime = 0; }
    hide('welcome-3');
    show('welcome-4');
    window.scrollTo(0, 0);
    var finalVideo = document.getElementById('welcome-final-video');
    if (finalVideo) {
      finalVideo.currentTime = 0;
      finalVideo.muted = false;
      finalVideo.volume = 1;
      finalVideo.load();
      var playFinal = function () {
        finalVideo.play().catch(function () {});
        var btn = document.querySelector('.welcome-final-unmute');
        if (btn) { btn.textContent = 'Sound on'; btn.setAttribute('aria-label', 'Sound on'); }
      };
      if (finalVideo.readyState >= 2) playFinal();
      else {
        finalVideo.addEventListener('canplay', playFinal, { once: true });
        setTimeout(playFinal, 300);
      }
    }
  });

  $('btn-welcome-continue').addEventListener('click', () => {
    var finalVideo = document.getElementById('welcome-final-video');
    if (finalVideo) {
      finalVideo.pause();
      finalVideo.currentTime = 0;
    }
    saveState();
    showStart();
  });
  $('btn-continue-to-scenario').addEventListener('click', () => {
    const radio = document.querySelector('input[name="org-context"]:checked');
    state.orgContext = (radio && radio.value) || 'small';
    state.megatrendOrderIndex = 0;
    saveState();
    showIntel(MEGATREND_ORDER[0]);
    updateContextStrip();
    updateProgress('intel');
  });
  $('btn-next').addEventListener('click', showNext);
  $('btn-view-report').addEventListener('click', showReport);
  $('btn-restart').addEventListener('click', restart);
  $('btn-clear-progress').addEventListener('click', () => {
    if (!confirm('Clear all saved progress? You will start from the beginning next time.')) return;
    clearSavedProgress();
    showIntro1();
  });

  $('btn-how-to-play').addEventListener('click', () => {
    const panel = $('how-to-play-panel');
    if (!panel) return;
    const isOpen = !panel.hidden;
    panel.hidden = isOpen;
    $('btn-how-to-play').setAttribute('aria-expanded', isOpen ? 'false' : 'true');
  });
  $('btn-close-how-to-play').addEventListener('click', () => {
    $('how-to-play-panel').hidden = true;
    $('btn-how-to-play').setAttribute('aria-expanded', 'false');
  });

  $('btn-resume').addEventListener('click', () => {
    $('resume-prompt').hidden = true;
    const fourDone = MEGATREND_ORDER.every(k => (state.choicesByMegatrend[k] && state.choicesByMegatrend[k].length > 0));
    const diversityDone = (state.choicesByMegatrend.diversity && state.choicesByMegatrend.diversity.length > 0);
    if (fourDone && diversityDone) showSummary();
    else if (fourDone) showScenario(4);
    else showIntel(MEGATREND_ORDER[state.megatrendOrderIndex]);
  });
  $('btn-start-new').addEventListener('click', () => {
    clearSavedProgress();
    state.firstMegatrendPassed = false;
    state.megatrendOrderIndex = 0;
    state.currentIndex = 0;
    state.quizQuestionIndex = 0;
    state.quizAnswers = {};
    state.usedMegatrends = new Set();
    state.choicesByMegatrend = { tech: [], climate: [], demographics: [], economic: [], diversity: [] };
    state.skillScores = { communication: 0, teamwork: 0, problemSolving: 0, digitalLiteracy: 0, criticalThinking: 0, timeManagement: 0 };
    $('resume-prompt').hidden = true;
    showIntro1();
  });

  const saved = loadState();
  const hasProgress = saved && (
    Object.keys(state.choicesByMegatrend).some(k => (state.choicesByMegatrend[k] && state.choicesByMegatrend[k].length > 0)) ||
    state.quizQuestionIndex > 0 ||
    (state.megatrendOrderIndex > 0 && state.usedMegatrends.size > 0)
  );
  if (hasProgress) {
    $('resume-prompt').hidden = false;
    hideAllScreens();
  } else {
    showTapToBegin();
  }
})();
