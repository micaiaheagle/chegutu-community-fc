/* ==========================================================================
   CHEGUTU COMMUNITY FOOTBALL CLUB — SITE CONTENT DATA
   --------------------------------------------------------------------------
   THIS IS THE ONLY FILE THE CLUB NEEDS TO EDIT FOR DAY-TO-DAY UPDATES.
   Everything below drives the fixtures, results, league table, squad,
   staff, news, videos and shop across the whole website.

   >>> IMPORTANT — SAMPLE DATA NOTICE <<<
   Fixtures, results, league standings, squad names, statistics, news
   articles and shop prices below are REALISTIC PLACEHOLDERS supplied so the
   site looks complete at launch. Replace them with the club's real data
   before going live. See README-HANDOVER.md for step-by-step instructions.
   ========================================================================== */

window.CCFC = window.CCFC || {};

/* ------------------------------------------------------------------ CLUB */
CCFC.club = {
  name: 'Chegutu Community Football Club',
  short: 'Chegutu Community FC',
  women: 'Chegutu Community Queens FC',
  boys: 'Chegutu Community Boys FC',
  motto: 'Developing Talent • Building Character • Inspiring Communities',
  ground: 'Pfupajena Grounds, Chegutu',
  email: 'info@chegutucommunityfc.com',
  phoneZW: '+263 784 658 667',
  phoneUK: '+44 7482 384389',
  whatsapp: '263784658667',
  address: 'P1034 Pfupajena, Chegutu, Mashonaland West, Zimbabwe',
  founded: 2019
};

/* -------------------------------------------------------------- FIXTURES */
/* team: 'women' | 'boys'  •  home: true = played at Pfupajena             */
CCFC.fixtures = [
  { id:'f1',  team:'women', date:'2026-08-08', time:'15:00', opponent:'Herentals Queens',      home:true,  comp:'ZWPSL',            venue:'Pfupajena Grounds, Chegutu', tickets:true },
  { id:'f2',  team:'boys',  date:'2026-08-09', time:'15:00', opponent:'Norton Community',     home:false, comp:'Division Two',     venue:'Katanga Grounds, Norton',    tickets:false },
  { id:'f3',  team:'women', date:'2026-08-15', time:'15:00', opponent:'Black Rhinos Queens',  home:false, comp:'ZWPSL',            venue:'Morris Depot, Harare',       tickets:false },
  { id:'f4',  team:'women', date:'2026-08-22', time:'15:00', opponent:'Harare City Queens',   home:true,  comp:'ZWPSL',            venue:'Pfupajena Grounds, Chegutu', tickets:true },
  { id:'f5',  team:'boys',  date:'2026-08-23', time:'15:00', opponent:'Chegutu Berks',        home:true,  comp:'Division Two',     venue:'Pfupajena Grounds, Chegutu', tickets:true },
  { id:'f6',  team:'women', date:'2026-08-29', time:'15:00', opponent:'Chapungu Queens',      home:false, comp:'ZWPSL',            venue:'Ascot Stadium, Gweru',       tickets:false },
  { id:'f7',  team:'women', date:'2026-09-05', time:'15:00', opponent:'Correctional Queens',  home:true,  comp:'ZWPSL',            venue:'Pfupajena Grounds, Chegutu', tickets:true },
  { id:'f8',  team:'boys',  date:'2026-09-06', time:'15:00', opponent:'Blue Jets Chegutu',    home:false, comp:'Division Two',     venue:'Chegutu Town Ground',        tickets:false },
  { id:'f9',  team:'women', date:'2026-09-12', time:'15:00', opponent:'Kwekwe Queens',        home:false, comp:'ZWPSL',            venue:'Torwood Stadium, Kwekwe',    tickets:false },
  { id:'f10', team:'women', date:'2026-09-19', time:'15:00', opponent:'Sheasham Queens',      home:true,  comp:'ZWPSL',            venue:'Pfupajena Grounds, Chegutu', tickets:true },
  { id:'f11', team:'boys',  date:'2026-09-20', time:'15:00', opponent:'Chingwere FC',         home:true,  comp:'Division Two',     venue:'Pfupajena Grounds, Chegutu', tickets:true },
  { id:'f12', team:'women', date:'2026-09-26', time:'15:00', opponent:'Highlanders Royals',   home:false, comp:'ZWPSL',            venue:'Barbourfields, Bulawayo',    tickets:false },
  { id:'f13', team:'women', date:'2026-10-03', time:'15:00', opponent:'Platinum Royals',      home:true,  comp:'ZWPSL',            venue:'Pfupajena Grounds, Chegutu', tickets:true },
  { id:'f14', team:'boys',  date:'2026-10-04', time:'15:00', opponent:'Cyclone FC',           home:false, comp:'Division Two',     venue:'Cyclone Ground, Chegutu',    tickets:false },
  { id:'f15', team:'women', date:'2026-10-10', time:'15:00', opponent:'Mpopoma Sports Academy', home:true, comp:'ZWPSL',           venue:'Pfupajena Grounds, Chegutu', tickets:true }
];

/* --------------------------------------------------------------- RESULTS */
CCFC.results = [
  /* REAL RESULT — taken from the club's own match footage (see the hero video
     and the Video page). Everything below it is sample data. */
  { id:'r0',  team:'women', date:'2026-08-02', opponent:'Herentals Queens',      home:true,  gf:1, ga:3, comp:'ZWPSL',        scorers:'—', report:'a1' },
  { id:'r1',  team:'women', date:'2026-07-25', opponent:'Cyclone Queens',        home:true,  gf:3, ga:0, comp:'ZWPSL',        scorers:'Moyo 12’, Ncube 44’, Dube 71’' },
  { id:'r2',  team:'women', date:'2026-07-25', opponent:'Blue Swallows Queens',  home:false, gf:2, ga:2, comp:'ZWPSL',        scorers:'Chirwa 23’, Moyo 88’' },
  { id:'r3',  team:'boys',  date:'2026-07-26', opponent:'TelOne Chegutu',        home:true,  gf:2, ga:1, comp:'Division Two', scorers:'Mutasa 33’, Banda 65’' },
  { id:'r4',  team:'women', date:'2026-07-18', opponent:'Faith Drive Queens',    home:true,  gf:4, ga:1, comp:'ZWPSL',        scorers:'Dube 8’, 52’, Moyo 30’, Sibanda 77’' },
  { id:'r5',  team:'women', date:'2026-07-11', opponent:'Conduit Soccer Academy',home:false, gf:1, ga:0, comp:'ZWPSL',        scorers:'Ncube 61’' },
  { id:'r6',  team:'boys',  date:'2026-07-12', opponent:'Norton Community',      home:false, gf:1, ga:1, comp:'Division Two', scorers:'Banda 49’' },
  { id:'r7',  team:'women', date:'2026-07-04', opponent:'Lobengula City Queens', home:true,  gf:2, ga:0, comp:'ZWPSL',        scorers:'Moyo 19’, Chirwa 70’' },
  { id:'r8',  team:'boys',  date:'2026-06-28', opponent:'Chegutu Berks',         home:false, gf:0, ga:2, comp:'Division Two', scorers:'—' },
  { id:'r9',  team:'women', date:'2026-06-27', opponent:'Herentals Queens',      home:false, gf:1, ga:3, comp:'ZWPSL',        scorers:'Dube 55’' },
  { id:'r10', team:'women', date:'2026-06-20', opponent:'Harare City Queens',    home:true,  gf:2, ga:1, comp:'ZWPSL',        scorers:'Sibanda 14’, Moyo 82’' }
];

/* ---------------------------------------------------------- LEAGUE TABLES */
CCFC.tables = {
  women: {
    name: 'Zimbabwe Women’s Premier Soccer League',
    season: '2026',
    rows: [
      { pos:1,  team:'Herentals Queens',       p:10, w:8, d:1, l:1, gf:22, ga:6,  form:'WWDWW' },
      { pos:2,  team:'Black Rhinos Queens',    p:10, w:7, d:2, l:1, gf:19, ga:7,  form:'WWWDL' },
      { pos:3,  team:'Chegutu Community Queens', p:10, w:6, d:2, l:2, gf:18, ga:9, form:'WWDLW', club:true },
      { pos:4,  team:'Harare City Queens',     p:10, w:6, d:1, l:3, gf:16, ga:11, form:'LWWWL' },
      { pos:5,  team:'Correctional Queens',    p:10, w:5, d:3, l:2, gf:14, ga:10, form:'DWDWW' },
      { pos:6,  team:'Chapungu Queens',        p:10, w:5, d:2, l:3, gf:13, ga:11, form:'WLWDW' },
      { pos:7,  team:'Highlanders Royals',     p:10, w:4, d:3, l:3, gf:12, ga:11, form:'DDWLW' },
      { pos:8,  team:'Platinum Royals',        p:10, w:4, d:2, l:4, gf:12, ga:13, form:'LWDLW' },
      { pos:9,  team:'Kwekwe Queens',          p:10, w:3, d:4, l:3, gf:11, ga:12, form:'DDLDW' },
      { pos:10, team:'Sheasham Queens',        p:10, w:3, d:2, l:5, gf:10, ga:15, form:'LLWDL' },
      { pos:11, team:'Mpopoma Sports Academy', p:10, w:2, d:4, l:4, gf:9,  ga:14, form:'DLDDW' },
      { pos:12, team:'Faith Drive Queens',     p:10, w:2, d:2, l:6, gf:8,  ga:17, form:'LLDWL' },
      { pos:13, team:'Conduit Soccer Academy', p:10, w:1, d:3, l:6, gf:7,  ga:18, form:'LDLLD' },
      { pos:14, team:'Lobengula City Queens',  p:10, w:1, d:1, l:8, gf:6,  ga:23, form:'LLLDL' }
    ]
  },
  boys: {
    name: 'Mashonaland West Division Two',
    season: '2026',
    rows: [
      { pos:1, team:'Chegutu Berks',          p:8, w:5, d:2, l:1, gf:14, ga:6,  form:'WWDWL' },
      { pos:2, team:'Norton Community',       p:8, w:4, d:3, l:1, gf:12, ga:7,  form:'DWWDW' },
      { pos:3, team:'Chegutu Community Boys', p:8, w:4, d:2, l:2, gf:11, ga:8,  form:'WDWLW', club:true },
      { pos:4, team:'Cyclone FC',             p:8, w:3, d:3, l:2, gf:10, ga:9,  form:'DDWLW' },
      { pos:5, team:'Blue Jets Chegutu',      p:8, w:3, d:2, l:3, gf:9,  ga:10, form:'WLDLW' },
      { pos:6, team:'TelOne Chegutu',         p:8, w:2, d:3, l:3, gf:8,  ga:10, form:'LDDWD' },
      { pos:7, team:'Chingwere FC',           p:8, w:2, d:1, l:5, gf:7,  ga:13, form:'LLWLD' },
      { pos:8, team:'Mubaira United',         p:8, w:1, d:2, l:5, gf:5,  ga:13, form:'LDLLW' }
    ]
  }
};

/* ----------------------------------------------------------------- SQUAD */
/* NOTE: Player names below are SAMPLE ENTRIES. Squad cards deliberately use
   the club crest graphic rather than photographs, so that no real person is
   shown next to a placeholder name. Add real names, bios and headshots here. */
CCFC.squad = [
  { id:'p1',  team:'women', no:1,  name:'Rutendo Chikoore',  pos:'Goalkeeper', posShort:'GK', dob:'2001-03-14', nat:'Zimbabwe', height:'1.74 m', foot:'Right', joined:'2022', apps:78,  goals:0,  cleanSheets:31, bio:'A commanding presence between the posts and a natural organiser of the back line. Progressed through the club’s goalkeeping programme before establishing herself as first choice.' },
  { id:'p2',  team:'women', no:12, name:'Nyasha Mataruse',   pos:'Goalkeeper', posShort:'GK', dob:'2004-09-02', nat:'Zimbabwe', height:'1.71 m', foot:'Right', joined:'2024', apps:14,  goals:0,  cleanSheets:5,  bio:'Academy graduate with excellent distribution and shot-stopping reflexes, pushing hard for a starting berth.' },
  { id:'p3',  team:'women', no:2,  name:'Tanaka Mhembere',   pos:'Defender',   posShort:'RB', dob:'2000-11-21', nat:'Zimbabwe', height:'1.66 m', foot:'Right', joined:'2021', apps:96,  goals:4,  cleanSheets:0,  bio:'Athletic full-back whose overlapping runs are a key part of the attacking pattern. Rarely beaten one-on-one.' },
  { id:'p4',  team:'women', no:3,  name:'Chiedza Mupfumira', pos:'Defender',   posShort:'LB', dob:'2002-05-30', nat:'Zimbabwe', height:'1.63 m', foot:'Left',  joined:'2022', apps:81,  goals:3,  cleanSheets:0,  bio:'Left-sided defender with a superb delivery from wide areas and an appetite for the defensive side of the game.' },
  { id:'p5',  team:'women', no:4,  name:'Precious Sibanda',  pos:'Defender',   posShort:'CB', dob:'1999-01-18', nat:'Zimbabwe', height:'1.78 m', foot:'Right', joined:'2020', apps:118, goals:9,  cleanSheets:0,  bio:'Club captain and defensive leader. Dominant in the air at both ends of the pitch and a vocal presence in the dressing room.', captain:true },
  { id:'p6',  team:'women', no:5,  name:'Ruvarashe Zhou',    pos:'Defender',   posShort:'CB', dob:'2003-07-09', nat:'Zimbabwe', height:'1.75 m', foot:'Right', joined:'2023', apps:44,  goals:2,  cleanSheets:0,  bio:'Composed ball-playing centre-back who reads the game beautifully and starts attacks from deep.' },
  { id:'p7',  team:'women', no:15, name:'Anesu Marondera',   pos:'Defender',   posShort:'CB', dob:'2005-02-27', nat:'Zimbabwe', height:'1.72 m', foot:'Left',  joined:'2024', apps:19,  goals:0,  cleanSheets:0,  bio:'Highly rated academy product who stepped up to senior football without missing a beat.' },
  { id:'p8',  team:'women', no:6,  name:'Melody Chirwa',     pos:'Midfielder', posShort:'DM', dob:'2000-08-12', nat:'Zimbabwe', height:'1.68 m', foot:'Right', joined:'2021', apps:104, goals:11, cleanSheets:0,  bio:'The metronome of the midfield. Breaks up play, recycles possession and dictates the tempo of every match.' },
  { id:'p9',  team:'women', no:8,  name:'Kudzai Nyamande',   pos:'Midfielder', posShort:'CM', dob:'2002-12-05', nat:'Zimbabwe', height:'1.65 m', foot:'Right', joined:'2022', apps:88,  goals:14, cleanSheets:0,  bio:'Box-to-box engine with a fierce shot from range and the stamina to cover every blade of grass.' },
  { id:'p10', team:'women', no:10, name:'Tatenda Moyo',      pos:'Midfielder', posShort:'AM', dob:'2001-06-23', nat:'Zimbabwe', height:'1.62 m', foot:'Left',  joined:'2020', apps:112, goals:41, cleanSheets:0,  bio:'The club’s creative heartbeat and leading scorer. A supremely gifted number ten who makes the difficult look effortless.' },
  { id:'p11', team:'women', no:14, name:'Shamiso Gomo',      pos:'Midfielder', posShort:'CM', dob:'2004-04-16', nat:'Zimbabwe', height:'1.67 m', foot:'Right', joined:'2023', apps:36,  goals:5,  cleanSheets:0,  bio:'Tenacious young midfielder whose pressing from the front sets the standard for the whole team.' },
  { id:'p12', team:'women', no:16, name:'Nokutenda Mlambo',  pos:'Midfielder', posShort:'CM', dob:'2005-10-08', nat:'Zimbabwe', height:'1.64 m', foot:'Right', joined:'2025', apps:11,  goals:1,  cleanSheets:0,  bio:'An U20 international prospect who joined from the academy and has adapted quickly to the senior game.' },
  { id:'p13', team:'women', no:7,  name:'Blessing Ncube',    pos:'Forward',    posShort:'RW', dob:'2001-09-19', nat:'Zimbabwe', height:'1.69 m', foot:'Left',  joined:'2021', apps:97,  goals:33, cleanSheets:0,  bio:'Direct, fearless winger who thrives at taking defenders on and delivering from the right-hand channel.' },
  { id:'p14', team:'women', no:11, name:'Rumbidzai Dube',    pos:'Forward',    posShort:'ST', dob:'2000-02-11', nat:'Zimbabwe', height:'1.73 m', foot:'Right', joined:'2020', apps:109, goals:52, cleanSheets:0,  bio:'A relentless centre-forward and the club’s all-time leading scorer. Ruthless in the box and tireless out of possession.' },
  { id:'p15', team:'women', no:9,  name:'Fadzai Muchemwa',   pos:'Forward',    posShort:'LW', dob:'2003-11-30', nat:'Zimbabwe', height:'1.66 m', foot:'Right', joined:'2023', apps:47,  goals:18, cleanSheets:0,  bio:'Explosive left-sided attacker with a devastating change of pace and an eye for the spectacular.' },
  { id:'p16', team:'women', no:19, name:'Tariro Kanengoni',  pos:'Forward',    posShort:'ST', dob:'2006-01-25', nat:'Zimbabwe', height:'1.70 m', foot:'Right', joined:'2025', apps:9,   goals:3,  cleanSheets:0,  bio:'The academy’s most exciting graduate. Sharp movement, clever finishing and a bright future ahead.' },

  { id:'b1',  team:'boys',  no:1,  name:'Takudzwa Zvobgo',   pos:'Goalkeeper', posShort:'GK', dob:'2004-04-02', nat:'Zimbabwe', height:'1.86 m', foot:'Right', joined:'2023', apps:38, goals:0,  cleanSheets:14, bio:'Athletic shot-stopper with an excellent command of his area and a rapid distribution game.' },
  { id:'b2',  team:'boys',  no:4,  name:'Simbarashe Mutasa', pos:'Defender',   posShort:'CB', dob:'2003-08-17', nat:'Zimbabwe', height:'1.83 m', foot:'Right', joined:'2022', apps:52, goals:6,  cleanSheets:0,  bio:'Uncompromising central defender and captain of the boys’ first team. A genuine leader from the back.', captain:true },
  { id:'b3',  team:'boys',  no:5,  name:'Tinashe Chikafu',   pos:'Defender',   posShort:'CB', dob:'2005-01-09', nat:'Zimbabwe', height:'1.80 m', foot:'Left',  joined:'2024', apps:24, goals:1,  cleanSheets:0,  bio:'Left-footed defender who is comfortable stepping into midfield with the ball.' },
  { id:'b4',  team:'boys',  no:6,  name:'Munashe Chibaya',   pos:'Midfielder', posShort:'DM', dob:'2004-06-11', nat:'Zimbabwe', height:'1.76 m', foot:'Right', joined:'2023', apps:41, goals:4,  cleanSheets:0,  bio:'Disciplined holding midfielder who shields the back four and keeps the ball moving.' },
  { id:'b5',  team:'boys',  no:8,  name:'Panashe Mandaza',   pos:'Midfielder', posShort:'CM', dob:'2006-03-22', nat:'Zimbabwe', height:'1.74 m', foot:'Right', joined:'2025', apps:16, goals:3,  cleanSheets:0,  bio:'A product of the U18 programme with outstanding technical quality and vision.' },
  { id:'b6',  team:'boys',  no:10, name:'Tapiwa Banda',      pos:'Forward',    posShort:'ST', dob:'2004-10-04', nat:'Zimbabwe', height:'1.79 m', foot:'Right', joined:'2022', apps:56, goals:29, cleanSheets:0,  bio:'The team’s focal point in attack. Strong, quick and clinical inside the penalty area.' },
  { id:'b7',  team:'boys',  no:7,  name:'Ngonidzashe Mhaka', pos:'Forward',    posShort:'RW', dob:'2005-07-28', nat:'Zimbabwe', height:'1.72 m', foot:'Left',  joined:'2024', apps:28, goals:11, cleanSheets:0,  bio:'Quick, inventive wide player who carries a real goal threat cutting in from the right.' },
  { id:'b8',  team:'boys',  no:11, name:'Farai Mukanya',     pos:'Forward',    posShort:'LW', dob:'2006-12-14', nat:'Zimbabwe', height:'1.70 m', foot:'Right', joined:'2025', apps:12, goals:4,  cleanSheets:0,  bio:'Academy graduate whose fearless dribbling has already earned him senior minutes.' }
];

/* ----------------------------------------------------------------- STAFF */
CCFC.staff = [
  /* `lead: true` gives a member of staff the large feature card.
     Replace `name` with her real name when you are ready to publish it. */
  { name:'Head Coach', role:'Women’s First Team', dept:'Football Operations',
    photo:'staff/head-coach.jpg', lead:true,
    bio:'Leads the Women’s First Team in the Zimbabwe Women’s Premier Soccer League, ' +
        'responsible for selection, training programme, match preparation and the ' +
        'development of every player in the senior women’s squad.' },
  { name:'Assistant Coach',               role:'Women’s First Team',   dept:'Football Operations', photo:'photos/p013.jpg' },
  { name:'Goalkeeping Coach',             role:'Both Senior Teams',         dept:'Football Operations', photo:'photos/p012.jpg' },
  { name:'Head Coach',                    role:'Boys First Team',           dept:'Football Operations', photo:'photos/p096.jpg' },
  { name:'Academy Director',              role:'U8 – U20 Programme',   dept:'Academy',             photo:'photos/p021.jpg' },
  { name:'Lead Academy Coach',            role:'U14 – U18',            dept:'Academy',             photo:'photos/p014.jpg' },
  { name:'Head of Women’s Football', role:'Player Development',        dept:'Women’s Football', photo:'photos/p033.jpg' },
  { name:'Club Doctor',                   role:'Medical Department',        dept:'Medical',             photo:'photos/p113.jpg' },
  { name:'Physiotherapist',               role:'Medical Department',        dept:'Medical',             photo:'photos/p102.jpg' },
  { name:'First Aid Lead',                role:'Matchday Medical Cover',    dept:'Medical',             photo:'photos/p078.jpg' },
  { name:'Strength &amp; Conditioning Coach', role:'Sports Science',        dept:'Sports Science',      photo:'photos/p081.jpg' },
  { name:'Performance Analyst',           role:'Analysis Department',       dept:'Analysis',            photo:'photos/p012.jpg' },
  { name:'Head of Recruitment',           role:'Scouting &amp; Recruitment', dept:'Scouting',           photo:'photos/p096.jpg' },
  { name:'Designated Safeguarding Officer', role:'Child Protection',        dept:'Safeguarding',        photo:'photos/p033.jpg' },
  { name:'Player Welfare Officer',        role:'Wellbeing &amp; Mental Health', dept:'Safeguarding',    photo:'photos/p102.jpg' },
  { name:'Education Officer',             role:'Academic Support',          dept:'Education',           photo:'photos/p088.jpg' },
  { name:'Community Development Manager', role:'Outreach Programmes',       dept:'Community',           photo:'photos/p047.jpg' },
  { name:'Commercial Manager',            role:'Partnerships &amp; Revenue', dept:'Commercial',         photo:'photos/p035.jpg' },
  { name:'Media &amp; Communications Officer', role:'Content &amp; Press',  dept:'Media',               photo:'photos/p036.jpg' },
  { name:'Team Manager',                  role:'Logistics &amp; Travel',    dept:'Administration',      photo:'photos/p018.jpg' }
];

/* ------------------------------------------------------------------ NEWS */
CCFC.news = [
  { id:'a1', cat:'Match Reports', catKey:'match-reports', date:'2026-08-01', img:'photos/p068.jpg',
    title:'Queens open the campaign with a commanding home win',
    excerpt:'A dominant second-half display at Pfupajena saw the Women’s First Team open their league account in emphatic style in front of a vocal home crowd.',
    body:['The Queens began the new league campaign exactly as the coaching staff had hoped, controlling possession from the first whistle and turning early pressure into a decisive advantage before the interval.','The opening goal arrived on twelve minutes, a well-worked move down the right that ended with a composed finish inside the six-yard box. A second before half-time settled any nerves, and the third midway through the second half was the pick of the afternoon.','“What pleased me most was the discipline without the ball,” the head coach said afterwards. “We pressed as a unit, we defended the box properly and we were ruthless when the chances came. That is the standard we have set for ourselves this season.”','Attention now turns to the trip to Harare next weekend, with the squad reporting back for recovery and analysis on Monday morning.'] },

  { id:'a2', cat:'Club News', catKey:'club', date:'2026-07-30', img:'photos/p035.jpg',
    title:'Gold Star Travel &amp; Tours confirmed as Official Travel Partner',
    excerpt:'The club is delighted to announce a landmark partnership that will support the travel programme for both senior teams and the academy age groups.',
    body:['Chegutu Community Football Club is proud to confirm Gold Star Travel &amp; Tours as its Official Travel Partner. The agreement covers matchday transport for the Women’s First Team, the Boys First Team and all academy age groups travelling to away fixtures and tournaments.','Reliable, safe travel is one of the single biggest barriers facing community clubs in Zimbabwe. This partnership removes that barrier and allows our players to arrive at every fixture rested, prepared and ready to perform.','“We share the club’s belief that young people deserve professional standards in everything, not just on the pitch,” a representative of Gold Star Travel &amp; Tours said. “Supporting the girls’ and boys’ programmes is something we are genuinely proud of.”','The club continues to welcome conversations with organisations interested in shirt sponsorship, academy sponsorship and community programme support.'] },

  { id:'a3', cat:'Academy', catKey:'academy', date:'2026-07-26', img:'photos/p014.jpg',
    title:'Academy trials open for the 2026/27 intake',
    excerpt:'Boys and girls aged 8 to 20 are invited to register for open trials across all academy age groups, with sessions running throughout August.',
    body:['Registration is now open for the 2026/27 academy intake. Trials will be held at Pfupajena Grounds across four weekends in August, covering every age group from Under 8 through to Under 20.','Every player who registers receives a full technical assessment, and successful candidates join a programme built around UEFA and CAF-inspired coaching methodology, strength and conditioning, sports psychology, nutrition guidance, video analysis and academic support.','There is no cost to attend a trial. Players should bring boots, shin pads, water and a completed parent or guardian consent form. Registration closes one week before each trial date.','“We are not only looking for the finished article,” the Academy Director explained. “We are looking for attitude, coachability and character. Talent is developed here — it does not have to arrive fully formed.”'] },

  { id:'a4', cat:'Community', catKey:'community', date:'2026-07-21', img:'photos/p047.jpg',
    title:'Girls’ empowerment programme reaches 500 pupils',
    excerpt:'The club’s schools outreach has now worked with more than five hundred girls across Chegutu district, combining football sessions with life-skills workshops.',
    body:['The club’s flagship girls’ empowerment programme has reached a significant milestone, with more than five hundred pupils across Chegutu district taking part since the initiative launched.','Delivered in partnership with local schools, each block combines weekly football coaching with workshops on staying in school, health education, self-confidence and leadership. Attendance data collected with participating schools shows encouraging improvements in retention among girls in the programme.','“Football is the doorway,” said the Community Development Manager. “Once a girl walks through it, we can talk about school, about health, about her future. The ball gets her in the room.”','The programme will expand to four additional schools in the coming term. Volunteers and partner organisations are welcome to get in touch.'] },

  { id:'a5', cat:'Club News', catKey:'club', date:'2026-07-15', img:'photos/p021.jpg',
    title:'Club adopts strengthened safeguarding framework',
    excerpt:'A refreshed Child Protection Policy, new Safeguarding Officer appointment and mandatory safe-recruitment checks now apply across every club activity.',
    body:['The safety and wellbeing of every player is the club’s highest priority. Following a full review, the board has adopted a strengthened safeguarding framework that applies to all teams, academy age groups, community sessions and club events.','The framework includes an updated Child Protection Policy, the appointment of a Designated Safeguarding Officer and a Player Welfare Officer, mandatory safe-recruitment checks and references for all staff and volunteers, an anti-bullying programme, and a clear reporting route for any concern.','All coaching staff and volunteers have completed refreshed safeguarding training. Parents and guardians can request a copy of the full policy at any time.','Any concern about the welfare of a child or adult at risk should be reported immediately to the Designated Safeguarding Officer.'] },

  { id:'a6', cat:'Interviews', catKey:'interviews', date:'2026-07-10', img:'photos/p036.jpg',
    title:'“This club changed the direction of my life”',
    excerpt:'One of our senior players reflects on joining the programme as a teenager, the discipline it demanded, and what she hopes the next generation takes from it.',
    body:['“When I first came here I was fifteen and I did not really believe football could take me anywhere,” she says. “I came because my friends came. I stayed because of how seriously everybody took us.”','That seriousness — fixed training times, fitness testing, video review, school attendance monitored alongside performance — is what she credits with the change. “Nobody had ever expected that much from me before. Once somebody expects something, you start expecting it from yourself.”','She now mentors the younger age groups on Saturday mornings. “I tell them the same thing every week: the football is the easy part. Being on time, listening, going to school, looking after your body — that is the part that decides who makes it.”','Her ambition is clear. “I want to play professionally, and I want a degree. This club has never told me I have to choose one.”'] },

  { id:'a7', cat:'Transfers', catKey:'transfers', date:'2026-07-04', img:'photos/p116.jpg',
    title:'Four academy graduates promoted to the senior squads',
    excerpt:'The club has confirmed the promotion of four players from the Under 20 programme into the Women’s and Boys First Team squads for the new season.',
    body:['Four young players have been promoted from the Under 20 programme into senior football ahead of the new campaign, continuing the club’s commitment to a genuine pathway from grassroots to the first team.','Each of the four has spent at least three seasons in the academy and trained with the senior squad throughout pre-season. All four will continue to receive academic support alongside their football commitments.','“Promotions like these are the whole point of the club,” the Academy Director said. “We are not here to buy a team. We are here to build one, from Chegutu, with players from Chegutu.”','The club’s pathway now runs from grassroots football through the youth academy and development squads into the senior teams, with national team and international scholarship opportunities beyond.'] },

  { id:'a8', cat:'Match Reports', catKey:'match-reports', date:'2026-06-28', img:'photos/p060.jpg',
    title:'Boys First Team battle to a hard-earned point on the road',
    excerpt:'A resilient defensive performance away from home earned the Boys First Team a valuable point against one of the division’s early pace-setters.',
    body:['The Boys First Team produced a disciplined, mature performance away from home to come away with a point against opponents sitting near the top of the division.','Having fallen behind midway through the first half, the response was excellent — the equaliser arriving just before the hour from a well-worked set piece, and the back line holding firm through a demanding final twenty minutes.','“We asked for character and we got it,” the head coach said. “This is a young group, several of them straight out of the academy, and to manage that game the way they did away from home tells me a lot.”','The side return to Pfupajena for their next fixture, where they will look to convert performances into three points.'] },

  { id:'a9', cat:'Club News', catKey:'club', date:'2026-06-20', img:'photos/p072.jpg',
    title:'Club unveils five-year strategic plan',
    excerpt:'A new strategic plan sets out the club’s ambition to become one of Africa’s leading football development organisations by 2031.',
    body:['The board has published a five-year strategic plan setting out how Chegutu Community Football Club intends to become one of Africa’s leading football development organisations.','The plan is built on six pillars: elite coaching and player development, education and academic support, safeguarding and welfare, sports science and medical provision, community impact, and commercial sustainability.','Key targets include establishing a full-time academy facility, achieving CAF club licensing standards, placing players in national team squads across every age group, and securing international scholarship routes for graduates.','“Ambition without a plan is just hope,” the chairperson said. “This document tells our players, parents, partners and community exactly what we intend to build and how we intend to build it.”'] },

  { id:'a10', cat:'Injury Updates', catKey:'injury', date:'2026-06-12', img:'photos/p113.jpg',
    title:'Medical department confirms pre-season fitness update',
    excerpt:'The medical team has provided a squad availability update ahead of the opening fixtures, with no long-term concerns reported.',
    body:['The club’s medical department has completed pre-season screening across both senior squads, with no long-term injury concerns reported ahead of the opening fixtures.','Two players are following individual return-to-play programmes and are expected to be available within a fortnight. All other squad members have completed full pre-season loading.','Screening this year included baseline movement assessment, cardiac screening and nutrition consultations for every senior player, alongside the academy’s annual growth and maturation monitoring.','“Prevention is far cheaper than treatment, and far kinder to the player,” the club doctor said. “The investment we make in screening now is what keeps players on the pitch in March.”'] },

  { id:'a11', cat:'Community', catKey:'community', date:'2026-06-05', img:'photos/p088.jpg',
    title:'Chegutu football festival brings 24 teams together',
    excerpt:'The club hosted a district-wide festival with school and community teams, combining competition with health and drug-awareness education.',
    body:['Twenty-four school and community teams took part in the club’s annual district football festival, held across a single weekend at Pfupajena Grounds.','Alongside the football, the festival hosted health education stands, a drug and substance abuse awareness workshop, and a disability inclusion session run in partnership with local organisations.','The festival is now the largest single community event on the club’s calendar, and forms a key part of the scouting programme for the academy age groups.','Planning is already underway for next year’s edition, with the club aiming to expand to thirty-two teams and add a dedicated girls’ competition.'] },

  { id:'a12', cat:'Press Releases', catKey:'press', date:'2026-05-28', img:'photos/p042.jpg',
    title:'Club statement on the 2026 season',
    excerpt:'An official statement from the board on competition entries, squad registration and the season ahead for both senior teams.',
    body:['Chegutu Community Football Club confirms that both senior teams have completed registration for the 2026 season, with the Women’s First Team competing in the Zimbabwe Women’s Premier Soccer League and the Boys First Team competing in the Mashonaland West Division Two League.','All squad registrations have been submitted and approved. The club has also completed the annual compliance review covering safeguarding, medical provision and financial reporting.','The club thanks its players, staff, volunteers, partners and supporters for their continued commitment, and looks forward to welcoming supporters to Pfupajena Grounds throughout the season.','Media enquiries should be directed to the Media and Communications Officer.'] }
];

/* ---------------------------------------------------------------- VIDEOS */
CCFC.videos = [
  /* REAL FOOTAGE — the club's own match video, filmed by Chegutu Pulse.
     `file` makes the card play inline instead of just linking out. */
  { id:'v0', cat:'Highlights', title:'Full Match — Chegutu Community Queens v Herentals Queens',
    dur:'3:22', date:'2026-08-02', img:'../video/hero-poster.jpg',
    file:'assets/video/hero-720.mp4', credit:'Filmed by Chegutu Pulse' },
  { id:'v1', cat:'Highlights', title:'Match Highlights — Queens 3-0 Cyclone Queens', dur:'6:42', date:'2026-07-25', img:'photos/p068.jpg' },
  { id:'v2', cat:'Interviews', title:'Post-Match: Head Coach reacts to the opening win', dur:'4:18', date:'2026-08-01', img:'photos/p013.jpg' },
  { id:'v3', cat:'Training',   title:'Inside Training: pre-season at Pfupajena',        dur:'8:05', date:'2026-07-28', img:'photos/p065.jpg' },
  { id:'v4', cat:'Interviews', title:'Player Feature: from the academy to the first team', dur:'5:33', date:'2026-07-24', img:'photos/p036.jpg' },
  { id:'v5', cat:'Press',      title:'Press Conference: Gold Star Travel partnership',  dur:'11:07', date:'2026-07-30', img:'photos/p035.jpg' },
  { id:'v6', cat:'Highlights', title:'Boys First Team — season review',            dur:'9:21', date:'2026-07-12', img:'photos/p049.jpg' },
  { id:'v7', cat:'Training',   title:'Academy Session: technical development U14',      dur:'7:44', date:'2026-07-08', img:'photos/p014.jpg' },
  { id:'v8', cat:'Highlights', title:'Trophy Day: silverware returns to Chegutu',       dur:'3:56', date:'2026-06-20', img:'photos/p072.jpg' }
];

/* ------------------------------------------------------------------ SHOP */
CCFC.products = [
  { id:'s1',  cat:'Replica Kit',   name:'2026/27 Home Shirt',        price:35, img:'photos/p117.jpg', tag:'New',       sizes:['S','M','L','XL','2XL'] },
  { id:'s2',  cat:'Replica Kit',   name:'2026/27 Away Shirt',        price:35, img:'photos/p049.jpg', tag:'New',       sizes:['S','M','L','XL','2XL'] },
  { id:'s3',  cat:'Replica Kit',   name:'Goalkeeper Shirt',          price:38, img:'photos/p041.jpg', tag:'',          sizes:['S','M','L','XL'] },
  { id:'s4',  cat:'Replica Kit',   name:'Junior Home Kit',           price:28, img:'photos/p121.jpg', tag:'Junior',    sizes:['6-7','8-9','10-11','12-13'] },
  { id:'s5',  cat:'Training Wear', name:'Club Training Tracksuit',   price:55, img:'photos/p116.jpg', tag:'Bestseller',sizes:['S','M','L','XL','2XL'] },
  { id:'s6',  cat:'Training Wear', name:'Training Top',              price:30, img:'photos/p110.jpg', tag:'',          sizes:['S','M','L','XL'] },
  { id:'s7',  cat:'Training Wear', name:'Travel Jacket',             price:48, img:'photos/p082.jpg', tag:'',          sizes:['S','M','L','XL','2XL'] },
  { id:'s8',  cat:'Leisure',       name:'Club Polo Shirt',           price:25, img:'photos/p053.jpg', tag:'',          sizes:['S','M','L','XL','2XL'] },
  { id:'s9',  cat:'Accessories',   name:'Club Cap',                  price:14, img:'photos/p005.jpg', tag:'',          sizes:['One size'] },
  { id:'s10', cat:'Accessories',   name:'Supporters’ Scarf',    price:16, img:'photos/p028.jpg', tag:'',          sizes:['One size'] },
  { id:'s11', cat:'Accessories',   name:'Match Football',            price:22, img:'photos/p003.jpg', tag:'',          sizes:['Size 4','Size 5'] },
  { id:'s12', cat:'Accessories',   name:'Club Water Bottle',         price:9,  img:'photos/p097.jpg', tag:'',          sizes:['750 ml'] }
];

/* ---------------------------------------------------- LANGUAGE (UI CHROME) */
/* Translates site chrome and key headings. Article and policy body copy
   remains in English — see README-HANDOVER.md for adding full translations. */
CCFC.i18n = {
  en: {},
  sn: {
    motto:'Kusimudzira Tarenda • Kuvaka Hunhu • Kukurudzira Nharaunda',
    tickets:'Matikiti', shop:'Chitoro', donate:'Ipa Rubatsiro', membership:'Uve Nhengo',
    jointrials:'Pinda Mumiedzo', news:'Nhau', matches:'Mitambo', teams:'Zvikwata',
    club:'Kirabhu', media:'Mhepo', fans:'Vatsigiri', partners:'Vashandi Pamwe',
    welcome:'Titambirei kuChegutu Community Football Club',
    oneclub:'Kirabhu Imwe. Nharaunda Imwe. Chiroto Chimwe.',
    latestnews:'Nhau Itsva', upcoming:'Mitambo Iri Kuuya', results:'Mhedzisiro',
    ourteams:'Zvikwata Zvedu', academy:'Chikoro Chenhabvu', community:'Nharaunda',
    partnerswithus:'Shanda Nesu', contactus:'Taurai Nesu', readmore:'Verenga Zvimwe',
    viewall:'Ona Zvese', buytickets:'Tenga Matikiti', joinus:'Batana Nesu',
    ftctah:'Iva chikamu chechinhu chikuru kupfuura nhabvu',
    ftctap:'Batana senhengo, shandira nenguva yako, tsigira chikwata kana kungouya kuzoona. Chipo chega chega chinovaka ramangwana remwana weChegutu.'
  },
  nd: {
    motto:'Sithuthukisa Italenta • Sakha Isimilo • Sikhuthaza Imiphakathi',
    tickets:'Amathikithi', shop:'Isitolo', donate:'Nikela', membership:'Ubulunga',
    jointrials:'Joyina Ukuhlolwa', news:'Izindaba', matches:'Imidlalo', teams:'Amaqembu',
    club:'Iklabhu', media:'Abezindaba', fans:'Abalandeli', partners:'Ababambisene Lathi',
    welcome:'Siyalamukela eChegutu Community Football Club',
    oneclub:'Iklabhu Elilodwa. Umphakathi Owodwa. Iphupho Elilodwa.',
    latestnews:'Izindaba Zakamuva', upcoming:'Imidlalo Ezayo', results:'Imiphumela',
    ourteams:'Amaqembu Ethu', academy:'I-Academy', community:'Umphakathi',
    partnerswithus:'Bambisana Lathi', contactus:'Xhumana Lathi', readmore:'Funda Okunengi',
    viewall:'Bona Konke', buytickets:'Thenga Amathikithi', joinus:'Joyina Lathi',
    ftctah:'Yiba yingxenye yento enkulu kulebhola',
    ftctap:'Joyina njengelunga, usebenze ngesikhathi sakho, uxhase iqembu kumbe uzobukela nje. Konke okunikelayo kwakha ikusasa lomntwana eChegutu.'
  }
};

/* ------------------------------------------------------- SEARCH INDEX ---- */
CCFC.searchIndex = [
  { t:'Home',                     u:'index.html',        d:'Welcome to Chegutu Community Football Club' },
  { t:'About Us',                 u:'about.html',        d:'Vision, mission and core values' },
  { t:'Our Teams',                u:'teams.html',        d:'Women’s First Team and Boys First Team' },
  { t:'Women’s First Team',  u:'team-women.html',   d:'Zimbabwe Women’s Premier Soccer League' },
  { t:'Boys First Team',          u:'team-boys.html',    d:'Mashonaland West Division Two League' },
  { t:'First Team Squad',         u:'squad.html',        d:'Player profiles, appearances and goals' },
  { t:'Coaches &amp; Staff',      u:'staff.html',        d:'Technical, medical and support staff' },
  { t:'Academy',                  u:'academy.html',      d:'Elite player development, U8 to U20' },
  { t:'Player Pathway',           u:'pathway.html',      d:'Grassroots to professional football' },
  { t:'Fixtures',                 u:'fixtures.html',     d:'Upcoming matches for both teams' },
  { t:'Results',                  u:'results.html',      d:'Recent results and match reports' },
  { t:'League Tables',            u:'table.html',        d:'ZWPSL and Division Two standings' },
  { t:'Statistics',               u:'stats.html',        d:'Appearances, goals and clean sheets' },
  { t:'News',                     u:'news.html',         d:'Latest club news and announcements' },
  { t:'Photo Gallery',            u:'gallery.html',      d:'The official club photo archive' },
  { t:'Videos',                   u:'videos.html',       d:'Highlights, interviews and training' },
  { t:'Club Shop',                u:'shop.html',         d:'Official merchandise and replica kit' },
  { t:'Tickets',                  u:'tickets.html',      d:'Matchday tickets and season passes' },
  { t:'Membership',               u:'membership.html',   d:'Digital membership cards and benefits' },
  { t:'Donate',                   u:'donate.html',       d:'Support the club and its programmes' },
  { t:'Partners',                 u:'partners.html',     d:'Sponsorship and commercial opportunities' },
  { t:'Community',                u:'community.html',    d:'Schools, girls’ empowerment and outreach' },
  { t:'Safeguarding',             u:'safeguarding.html', d:'Child protection and player welfare' },
  { t:'Governance',               u:'governance.html',   d:'Policies, reports and strategic plan' },
  { t:'Club Departments',         u:'departments.html',  d:'Fourteen departments across the club' },
  { t:'Careers &amp; Volunteering', u:'careers.html',    d:'Work and volunteer with the club' },
  { t:'Register / Trials',        u:'register.html',     d:'Player registration and academy trials' },
  { t:'Contact Us',               u:'contact.html',      d:'Get in touch with the club' },
  { t:'Privacy Policy',           u:'privacy.html',      d:'How we handle your data' },
  { t:'Terms of Use',             u:'terms.html',        d:'Website terms and conditions' },
  { t:'Accessibility',            u:'accessibility.html',d:'Our accessibility commitment' },
  { t:'Sitemap',                  u:'sitemap.html',      d:'Every page on this website' }
];
