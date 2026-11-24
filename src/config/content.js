/**
 * ============================================================================
 *  CONTENT CONFIGURATION
 * ============================================================================
 *  This is the ONLY file you need to edit to personalize the entire website.
 *  Replace the placeholder text, photo paths, and media paths below.
 *
 *  MEDIA FOLDERS (drop your real files in these folders, then update
 *  the paths in this file to match the filenames):
 *    src/assets/photos/   → gallery images
 *    src/assets/music/    → song mp3 files + album art
 *    src/assets/voice/    → the voice message recording (mp3/m4a)
 *    src/assets/videos/   → raw memory clips + the final polished video
 * ============================================================================
 */

export const siteConfig = {
  // The recipient's name, used in the hero + meta title
  recipientName: 'My Favorite Person',
  // Your name, used in the signature of the closing scene
  authorName: 'Anjana',
};

/* ----------------------------------------------------------------------- */
/*  BACKGROUND MUSIC — plays throughout the entire site                    */
/* ----------------------------------------------------------------------- */
/*  This single track starts the moment the visitor clicks "Begin Our      */
/*  Story" and keeps playing (looped) the whole way through the site —     */
/*  it quietly ducks lower while the letter is being read or the voice     */
/*  message plays, and fades out entirely once the finale begins.         */
/*  Just replace `src` with your own song file in src/assets/music/.       */
export const backgroundMusic = {
  src: '/src/assets/music/opening-piano.mp3',
  volume: 0.45, // 0 (silent) to 1 (full volume)
};

/* ----------------------------------------------------------------------- */
/*  OPENING SCENE                                                          */
/* ----------------------------------------------------------------------- */
export const opening = {
  eyebrow: 'A little something for you',
  title: 'Happy Birthday,',
  subtitle: 'My Favorite Person ❤️',
  cta: 'Begin Our Story',
};

/* ----------------------------------------------------------------------- */
/*  CHAPTER 1 — OUR STORY (timeline)                                       */
/* ----------------------------------------------------------------------- */
export const timeline = [
  {
    id: 'classmates',
    icon: 'BookOpen',
    label: 'Classmates',
    year: 'Where it started',
    description: 'Two strangers sharing the same classroom, not knowing what was quietly beginning.',
  },
  {
    id: 'best-friends',
    icon: 'Users',
    label: 'Best Friends',
    year: 'Somewhere in between',
    description: 'Inside jokes, late night calls, and a friendship that felt like home.',
  },
  {
    id: 'love',
    icon: 'Heart',
    label: 'Love',
    year: 'And then, everything changed',
    description: 'What started as friendship quietly became the best love story I never planned.',
  },
];

/* ----------------------------------------------------------------------- */
/*  CHAPTER 2 — OUR MEMORIES (photo gallery)                               */
/* ----------------------------------------------------------------------- */
export const photos = [
  {
    id: 1,
    src: '/src/assets/photos/memory-01.jpg',
    caption: 'The day everything felt lighter, just because you were there.',
  },
  {
    id: 2,
    src: '/src/assets/photos/memory-02.jpg',
    caption: 'That afternoon we laughed until it hurt.',
  },
  {
    id: 3,
    src: '/src/assets/photos/memory-03.jpg',
    caption: 'A quiet moment I never wanted to end.',
  },
  {
    id: 4,
    src: '/src/assets/photos/memory-04.jpg',
    caption: 'You, being effortlessly you.',
  },
  {
    id: 5,
    src: '/src/assets/photos/memory-05.jpg',
    caption: 'A memory I replay on hard days.',
  },
  {
    id: 6,
    src: '/src/assets/photos/memory-06.jpg',
    caption: 'This is the smile I fell for.',
  },
];

/* ----------------------------------------------------------------------- */
/*  HOME VIDEOS — your raw, unedited memory clips                          */
/* ----------------------------------------------------------------------- */
/*  A gallery of short, real video clips (unfiltered, straight from your   */
/*  phone is perfect) — separate from the single polished `finalVideo`     */
/*  below. Add as many as you like; keep each clip short (under ~30s) and  */
/*  compressed so the site stays fast to load.                             */
export const memoryVideos = [
  {
    id: 1,
    src: '/src/assets/videos/clip-01.mp4',
    caption: 'That random Tuesday that somehow became a core memory.',
  },
  {
    id: 2,
    src: '/src/assets/videos/clip-02.mp4',
    caption: 'You, mid-laugh, not knowing I was recording.',
  },
  {
    id: 3,
    src: '/src/assets/videos/clip-03.mp4',
    caption: 'One of my favorite ordinary moments with you.',
  },
];

/* ----------------------------------------------------------------------- */
/*  MEMORY JAR — "Open When You Need a Smile"                              */
/* ----------------------------------------------------------------------- */
/*  A jar full of small handwritten-style notes. Each click reveals a      */
/*  random note (no repeats until every note has been shown once, then     */
/*  it reshuffles). Add as many notes as you like.                         */
export const memoryJar = {
  eyebrow: 'Open When You Need a Smile',
  title: 'The Memory Jar',
  subtitle: 'A little jar of things I never got around to saying out loud. Give it a tap.',
  openAnotherLabel: 'Open Another Memory',
  hint: 'Tap the jar',
  notes: [
    'I still remember the first time we talked.',
    'You always make ordinary days feel magical.',
    'If today feels difficult, remember how incredibly strong you are.',
    'You are loved more than you realize.',
    'I hope this note finds you exactly when you need it.',
    'You make my world brighter just by being in it.',
    "I'll always be cheering for you.",
    'I never get tired of loving you.',
    'You deserve every happiness this world has to offer.',
    'No matter how hard today is, tomorrow still has beautiful surprises waiting for you.',
    'You have this quiet strength most people never notice. I do.',
    'Some days I just think about your laugh and smile for no reason.',
    "Whatever you're carrying today, you don't have to carry it alone.",
    "I'm proud of you, even on the days you forget to be proud of yourself.",
    'You make hard conversations feel safe.',
    'Remember that time we got lost and somehow it became one of my favorite days?',
    'Your kindness is not wasted, even when it feels unnoticed.',
    "I like the version of me that exists when I'm around you.",
    'Rest today if you need to. The world can wait.',
    'You are someone worth knowing, and I get to know you.',
    'You have never once made me feel small. Thank you.',
    'I keep a mental list of your best jokes. This is not a compliment. This is a warning.',
    'You are doing better than you think you are.',
    'Some of my favorite memories are just ordinary moments with you.',
    "I love how you say what you're thinking without overthinking it.",
    'If I could bottle one sound, it would be your laugh.',
    'You make it easy to be honest.',
    'I am so glad classmates turned into this.',
    'You are the calm in most of my chaotic days.',
    'Whatever today looks like, I am in your corner.',
    'You have a way of making people feel like they matter.',
    'I still think about the little things you do without realizing it.',
    'Being comfortable with someone is underrated. I have that with you.',
    'You make trying again feel possible.',
    'I hope you know how much lighter you make things.',
    'You are somebody\u2019s favorite part of the day. Probably mine.',
    'Some people talk about finding home. I found a person instead.',
    'You are allowed to have an off day. I will still be here.',
    'I remember more of our small talks than I let on.',
    'You make me want to be a better listener.',
    'However today goes, you are still someone worth rooting for.',
    'I like your handwriting. I like your humor more.',
    'You never make me feel like I have to explain myself twice.',
    'This note has no real point except: I was thinking of you.',
    'You carry more than people realize. You do it well.',
    'I hope you laugh at something small today.',
    'You are the reason a few ordinary days are core memories now.',
    'It is a good thing you exist. Just saying.',
    'You make being known feel safe instead of scary.',
    'Whatever you are proud of lately, I am proud of it too.',
    'I like the way you get excited about things you love.',
    'You are patient with people in a way that is quietly impressive.',
    'This is your reminder that you are doing enough.',
    'I still smile thinking about our dumbest inside joke.',
    'You make effort look effortless.',
    'Some days you are my favorite person to text nothing important to.',
    'You are worth showing up for, and I plan on it.',
    'I hope today gives you one good, uncomplicated moment.',
    'You have never needed to be anyone other than yourself around me.',
    'This jar exists because some feelings do not fit in one conversation.',
  ],
};

// Special notes unlocked as milestones are reached in the "100 Reasons" deck below.
// Each one appears inside the jar, styled gold, once its milestone is hit.
export const jarMilestoneNotes = [
  {
    milestone: 10,
    title: "You've found 10 reasons",
    intro: "You've discovered 10 reasons already\u2026 but the truth is, there are infinitely more. Here's one memory that still makes me smile every single time\u2026",
    memory:
      'That evening we stayed on the phone until neither of us had anything left to say, and just sat there, not hanging up, because neither of us wanted the day to end yet.',
  },
  {
    milestone: 25,
    title: "You've found 25 reasons",
    intro: 'Love isn\u2019t measured by numbers. But every reason you\u2019ve found is another little piece of my heart.',
    memory:
      'I still think about the time you showed up on a bad day with absolutely nothing to say, and just stayed anyway. That was enough. That was everything.',
  },
  {
    milestone: 50,
    title: 'My favorite memory',
    intro: 'The jar is glowing a little brighter now. Fifty reasons in, and here\u2019s the one I keep coming back to.',
    memory:
      'My favorite memory: an ordinary day, nothing planned, nothing special, and somehow it became the day I realized I wanted a hundred more days exactly like it, with exactly you.',
  },
  {
    milestone: 75,
    title: 'One thing I\u2019ll never forget',
    intro: 'Seventy-five reasons. The hearts are floating a little higher now.',
    memory:
      'One thing I will never forget about you: the way you say my name when you\u2019re trying not to laugh. I could live a hundred years and still love that sound.',
  },
];

/* ----------------------------------------------------------------------- */
/*  100 REASONS I LOVE YOU (flip-card deck)                                */
/* ----------------------------------------------------------------------- */
export const loveReasons = {
  eyebrow: 'A Little Longer',
  title: '100 Reasons Why I Love You',
  subtitle: 'Untie the ribbon. Go one card at a time \u2014 or all the way through.',
  reasons: [
    'I love your kindness.',
    'I love your patience.',
    'I love your honesty, even when it\u2019s inconvenient.',
    'I love your sense of humor.',
    'I love how curious you are about the world.',
    'I love how ambitious you are, quietly and without needing applause.',
    'I love how humble you stay about the things you\u2019re actually great at.',
    'I love your generosity.',
    'I love how brave you are, especially when you don\u2019t feel brave at all.',
    'I love your empathy for people who are hurting.',
    'I love your optimism, even on the days it\u2019s hard-won.',
    'I love your loyalty.',
    'I love how creative your mind is.',
    'I love how calm you are in a crisis.',
    'I love your quiet confidence.',
    'I love your thoughtfulness in the smallest moments.',
    'I love your playful side.',
    'I love your determination when things get hard.',
    'I love your gentleness with people who need it most.',
    'I love how open-minded you are.',
    'I love the way your smile instantly makes everything better.',
    'I love how safe I feel whenever I\u2019m with you.',
    'I love the way you laugh with your whole self.',
    'I love how passionate you are about the things you care about.',
    'I love how you encourage me, even when you\u2019re tired.',
    'I love the little things you do without realizing.',
    'I love how you remember small details I mentioned once.',
    'I love how every moment with you becomes a memory.',
    'I love the way you hum without noticing you\u2019re doing it.',
    'I love how you double-check the door is locked, every single time.',
    'I love your terrible puns. I love them more than I should.',
    'I love how you always offer me the last bite.',
    'I love your taste in music, even the songs I pretend not to like.',
    'I love how you talk to animals like they understand you.',
    'I love the face you make when you\u2019re concentrating.',
    'I love your handwriting.',
    'I love how you narrate your own jokes before the punchline lands.',
    'I love the ridiculous nicknames you\u2019ve given me.',
    'I love how you always know the shortcut.',
    'I love your bedhead in the morning.',
    'I love that you save the silliest photos of me.',
    'I love how deep your rabbit holes go once you\u2019re interested in something.',
    'I love our late night talks that start small and end up everywhere.',
    'I love our road trips, even the wrong turns.',
    'I love that one rainy day we didn\u2019t plan and never forgot.',
    'I love the time we got completely lost and just laughed about it.',
    'I love our cooking disasters more than our cooking successes.',
    'I love our inside jokes that make no sense to anyone else.',
    'I love our movie nights, especially the ones we don\u2019t finish.',
    'I love how we argue about music and never actually agree.',
    'I love our random conversations at 2am that go nowhere and everywhere.',
    'I love celebrating small, unimportant wins with you.',
    'I love our comfortable silences.',
    'I love dancing badly in the kitchen with you.',
    'I love planning trips we may never actually take.',
    'I love our long, rambling text threads.',
    'I love watching the sun go down with you and not saying much.',
    'I love how safe you make me feel.',
    'I love how you listen without rushing to fix things.',
    'I love how you show up, especially on the hard days.',
    'I love how you believe in me more than I believe in myself sometimes.',
    'I love your patience with me on my worst days.',
    'I love that you check in, even when I don\u2019t ask you to.',
    'I love how you make hard days feel a little lighter.',
    'I love that you\u2019ve never once made me feel small.',
    'I love how you celebrate my wins like they\u2019re yours.',
    'I love how you hold space for whatever I\u2019m feeling.',
    'I love how understood I feel around you.',
    'I love that you\u2019ve never given up on me.',
    'I love how you make me braver than I actually am.',
    'I love how you make me feel chosen, every day, not just on the big ones.',
    'I love how you make me feel like enough, exactly as I am.',
    'I love your smile.',
    'I love your eyes.',
    'I love your hugs, the kind that last a few seconds longer than expected.',
    'I love your laugh. I already said it. I\u2019m saying it again.',
    'I love the way you hold my hand without thinking about it.',
    'I love your voice, especially half-asleep.',
    'I love that you feel like home.',
    'I love your warmth.',
    'I love the way you look at me when you think I\u2019m not paying attention.',
    'I love how comforting you are without even trying.',
    'I love how you make me want to be a better person.',
    'I love how easily you talk about the future with me in it.',
    'I love how much you support my dreams, even the unrealistic ones.',
    'I love how you make ordinary days feel extraordinary.',
    'I love how every year with you feels like a gift I didn\u2019t expect.',
    'I love how you\u2019ve made home feel like an actual place, not just an address.',
    'I love how you make me excited for whatever comes next.',
    'I love how we\u2019ve grown up a little, together.',
    'I love how our story keeps somehow getting better.',
    'I love how you make forever sound like a reasonable idea.',
    'I love that you chose me, and keep choosing me.',
    'I love that you stayed, even when it would have been easier not to.',
    'I love that you are exactly, completely you.',
    'I love that you can make me laugh when I really don\u2019t want to.',
    'I love that you love me exactly as I am, unfinished parts included.',
    'I love that you are my safest place.',
    'I love that you taught me what this is actually supposed to feel like.',
    'I love every quiet \u201cI\u2019m proud of you\u201d you\u2019ve ever said.',
  ],
};

/* ----------------------------------------------------------------------- */
/*  FINAL LETTER — unlocked after all 100 reasons are read                 */
/* ----------------------------------------------------------------------- */
export const reasonsFinalLetter = {
  salutation: 'My Love,',
  paragraphs: [
    'You\u2019ve just read 100 reasons why I love you. But if I\u2019m honest, I could never fit all my feelings into 100 cards.',
    'Some things can\u2019t be counted. Some feelings can\u2019t be measured.',
    'If someone ever asked me, \u201cWhat\u2019s the biggest reason you love them?\u201d I\u2019d smile, and simply answer \u2014 because it\u2019s you.',
    'Thank you for every laugh, every memory, every smile, every ordinary day that became extraordinary because you were in it.',
  ],
  closing: 'Happy Birthday, my favorite person. I love you. Always.',
  signature: 'Anjana',
};

/* ----------------------------------------------------------------------- */
/*  CHAPTER 3 — LOVE LETTER                                                */
/* ----------------------------------------------------------------------- */
export const loveLetter = {
  salutation: 'My love,',
  paragraphs: [
    'I don\u2019t think I\u2019ve ever told you how much your presence has quietly rearranged my life for the better.',
    'You walked in as a classmate, stayed as a best friend, and somewhere along the way, without any grand announcement, you became home.',
    'Every ordinary day with you has a way of becoming a memory I want to keep. I hope this little corner of the internet makes you feel even a fraction of how loved you are.',
    'Here\u2019s to more classrooms, more inside jokes, and more birthdays spent making each other feel this seen.',
  ],
  signOff: 'Yours, always,',
  signature: 'Anjana',
};

/* ----------------------------------------------------------------------- */
/*  CHAPTER 4 — OUR SONGS                                                  */
/* ----------------------------------------------------------------------- */
export const songs = [
  {
    id: 1,
    title: 'Song Title One',
    artist: 'Artist Name',
    cover: '/src/assets/music/cover-01.jpg',
    src: '/src/assets/music/song-01.mp3',
  },
  {
    id: 2,
    title: 'Song Title Two',
    artist: 'Artist Name',
    cover: '/src/assets/music/cover-02.jpg',
    src: '/src/assets/music/song-02.mp3',
  },
  {
    id: 3,
    title: 'Song Title Three',
    artist: 'Artist Name',
    cover: '/src/assets/music/cover-03.jpg',
    src: '/src/assets/music/song-03.mp3',
  },
];

/* ----------------------------------------------------------------------- */
/*  CHAPTER 5 — BIRTHDAY SURPRISE                                          */
/* ----------------------------------------------------------------------- */
export const birthdaySurprise = {
  title: 'Happy Birthday ❤️',
  message: 'May this year hold every quiet joy, every loud laugh, and everything in between \u2014 all of it, just for you.',
};

/* ----------------------------------------------------------------------- */
/*  TYPING SCENE — final surprise button + typewriter script                */
/* ----------------------------------------------------------------------- */
export const finalSurprise = {
  buttonLabel: 'One last memory...',
};

export const typingScript = [
  'If someone asked me...',
  'What is your favorite blessing?',
  'I\u2019d smile...',
  'because I already know the answer.',
  'It has always been...',
  'You.',
];

/* ----------------------------------------------------------------------- */
/*  VOICE MESSAGE                                                          */
/* ----------------------------------------------------------------------- */
export const voiceMessage = {
  audioSrc: '/src/assets/voice/voice-message.mp3',
  // Shown as a soft caption beneath the waveform, optional
  caption: 'A message, in my own voice.',
};

/* ----------------------------------------------------------------------- */
/*  FINAL VIDEO                                                            */
/* ----------------------------------------------------------------------- */
export const finalVideo = {
  src: '/src/assets/videos/memory-video.mp4',
  // Delay (ms) after voice message begins before this fades in
  delayMs: 8000,
};

/* ----------------------------------------------------------------------- */
/*  ENDING                                                                 */
/* ----------------------------------------------------------------------- */
export const ending = {
  lines: ['Thank you for existing.', '\u2764\ufe0f', 'I love you.', 'Happy Birthday.'],
  foreverLabel: 'Forever,',
  signature: 'Anjana',
};

/* ----------------------------------------------------------------------- */
/*  SPIRITUAL ENDING                                                       */
/* ----------------------------------------------------------------------- */
export const spiritualEnding = {
  line: 'Some prayers are answered in unexpected ways.',
  dedication: 'Thank you, Guruvayoorappa. \ud83e\udd9a',
};
