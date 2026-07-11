// Game + template catalog for the arcade launcher (index.html). Loaded as a
// classic <script src="games.js"> BEFORE index.html's main inline script, so
// every global below (GAMES, gameByFile, DEMO_GAMES, ...) is ready when the
// launcher runs. Edit games here — this is the single source of truth.

// file:     unique id for the entry. For local games it's the .html filename in
//           games/ that gets loaded into the iframe. For off-site games it's
//           just a slug id (no .html) — `url` below supplies the real source.
// url:      OPTIONAL full external URL. When set, the game loads from here in the
//           iframe instead of games/<file>, and the entry is marked "↗ off-site".
//           Cross-ORIGIN games can't share the launcher's localStorage, so their
//           scoreKey won't resolve (leave it unset). Same-origin works (every repo
//           under one *.github.io user shares an origin). The host must allow
//           framing (no X-Frame-Options: DENY).
// source:   OPTIONAL "Source ↗" target for off-site games (their own repo). When
//           omitted on an off-site entry the Source button points at `url`.
// category: row grouping in the welcome screen (one per game).
// emoji:    single grapheme used as "boxart" on tiles + sidebar cards.
// emojiStyle: optional inline-CSS string applied to that emoji's element on
//           both the welcome tile and the sidebar card (e.g.
//           'filter: invert(1) hue-rotate(120deg)'). Most games omit it; use it
//           to recolor/invert/filter an emoji that doesn't fit the game. Note an
//           inline `filter:` overrides the tile's stylesheet drop-shadow glow —
//           include your own drop-shadow in the string to keep it.
// tags:     descriptive chips on the card (visible to the user).
// keywords: search-only synonyms — original arcade name (for renames) plus
//           genre cues people might type. Never rendered as chips.
// top:      1..N — appears in the "Top Picks" row at that rank. Unset = not featured.
// demo:     true if the game runs in attract mode in the hero cabinet (#demo).
//           Replaces the old standalone DEMO_GAMES list — derived below.
// hero:     true to pin the game to the FRONT of the hero rotation. Replaces
//           the old FEATURED_GAMES list — derived below. (None set currently.)
// gamepad:  true if the game reads the gamepad API — drives the 🎮 chip on tiles/cards.
// scoreKey: dotted path into the per-game save blob. e.g. 'tetris.bestScore'
//           reads the 'tetris' save and returns its .bestScore field.
//           Plain literal keys (for unmigrated games) also work.
const GAMES = [
    // ---- Frank Force Games (off-site) — load from external URLs via `url`. ----
    { file:'DrivenWild',           name:'Driven Wild',      emoji:'🚗',  category:'frankforce', source:'https://github.com/js13kGames/dr1v3n-wild',   desc:'Retro Arcade Driving.',  url:'https://itch.io/embed-upload/15345755?color=000000', tags:['driving','js13k','3d'],            keywords:['outrun','race'] },
    { file:'L1ttl3Paws',           name:'L1ttl3 Paws',      emoji:'🐈',  category:'frankforce', source:'https://github.com/KilledByAPixel/JS13K2025',   desc:'Hill sliding with colorful art.',  url:'https://itch.io/embed-upload/16167549?color=000000', tags:['cats','js13k'],            keywords:['tinywings'] },
    { file:'EggTimeRewind',           name:'Egg Time Rewind',      emoji:'🥚',  category:'frankforce', source:'https://github.com/js13kGames/egg-time-rewind',   desc:'Time REWINDS when you die.',  url:'https://itch.io/embed-upload/7314694?color=000000', tags:['js13k'],            keywords:['shooter'] },
    { file:'Bogus Roads',           name:'BogusRoads',      emoji:'🔶',  category:'frankforce',  desc:'Hit the road before the road hits you!',  url:'https://itch.io/embed-upload/4719204?color=180023', tags:['driving','3d'],            keywords:['lowres','race'] },

    // ---- Local URLs. ----
    { file:'2048.html',           name:'2048',            emoji:'🔢',  category:'puzzle',       desc:'Slide tiles to combine numbers.',       scoreKey:'2048.bestScore',            tags:['grid','merge'],                           keywords:['threes','merge','numbers'], gamepad:true },
    { file:'astroblast.html',      name:'Astroblast',      emoji:'🌑',  category:'shooter',      desc:'Thrust and blast the rocks.',    scoreKey:'asteroids.bestScore',       tags:['retro','space'],                 keywords:['asteroids','rocks','vector shooter'], top:10, demo:true, gamepad:true },
    { file:'homerDerby.html',       name:'Home Run Derby',     emoji:'⚾',  category:'construction',       desc:'Swing for the fences.',                   tags:['one-button','timing'],                     keywords:['baseball','home run derby','bat'], gamepad:true },
    { file:'freeThrow.html',     name:'Free Throw',      emoji:'🏀',  category:'sports',       desc:'Sink free throws before time runs out.',  scoreKey:'basketball.bestScore',      tags:['timing','aim'],                keywords:['basketball','hoops','nba jam','dunk'], demo:true },
    { file:'brickout.html',       name:'Brickout',        emoji:'🧱',  category:'arcade',       desc:'Bounce the ball to break bricks.',      scoreKey:'breakout.bestScore',        tags:['paddle','retro'],                 keywords:['breakout','arkanoid','bricks'], demo:true, gamepad:true },
    { file:'centibug.html',      name:'Centibug',        emoji:'🐛',  category:'shooter',      desc:'Blast the centipede before it lands.',    scoreKey:'centipede.bestScore',       tags:['retro','classic'],                 keywords:['centipede','millipede','bug shooter','garden'], demo:true, gamepad:true },
    { file:'checkers.html',       name:'Checkers',        emoji:'🔴',  category:'board',        desc:'Jump to capture your rival.',             tags:['strategy','2-player'],            keywords:['draughts'], top:10, demo:true },
    { file:'chess.html',          name:'Chess',           emoji:'♟️', category:'board',        desc:'The classic game of kings and pawns.',              tags:['strategy','2-player'],            keywords:['chess'] },
    { file:'pillars.html',        name:'Pillars',         emoji:'💎',  category:'puzzle',       desc:'Rotate falling jewels to match three.',     scoreKey:'columns.bestScore',         tags:['falling','matching'],             keywords:['columns','tetris attack','jewels','gem stack'], gamepad:true },
    { file:'tankCombat.html',         name:'Tank Combat',     emoji:'🎖️', category:'construction', desc:'Tanks battle in a small arena.',           tags:['multiplayer','retro'],            keywords:['combat','atari combat','tank duel','battle city'], gamepad:true },
    { file:'connect4.html',       name:'Drop Four',       emoji:'🟡',  category:'board',        desc:'Drop discs in a line of four.',               tags:['strategy','2-player'],            keywords:['connect four','four in a row'] },
    { file:'protector.html',       name:'Protector',       emoji:'🛸',  category:'construction', desc:'Blast aliens and rescue the humans.',        scoreKey:'defender.bestScore',        tags:['scrolling','rescue'],            keywords:['defender','stargate','humans','rescue'], gamepad:true },
    { file:'dominoes.html',       name:'Dominoes',        emoji:'🀄',  category:'construction', desc:'Match tiles end to end.',                 tags:['tiles','2-player'],               keywords:['domino','dominoes','draw','block','tiles'] },
    { file:'drPill.html',        name:'Dr. Pill',        emoji:'💊',  category:'puzzle',       desc:'Drop pills to wipe out viruses.',       scoreKey:'drMario.bestScore',         tags:['falling','matching'],             keywords:['dr mario','dr robotnik','pills','virus','puzzle league'], gamepad:true },
    { file:'emojiSurvivors.html', name:'Emoji Survivors', emoji:'🧛',  category:'shooter',      desc:'Outlast the emoji horde.',        scoreKey:'emojiSurvivors.bestTime',   tags:['survival','roguelite'],           keywords:['vampire survivors','brotato','horde','bullet heaven','roguelite'], top:4, gamepad:true },
    { file:'floppyBird.html',     name:'Floppy Bird',     emoji:'🐦',  category:'arcade',       desc:'Tap to flap between the pipes.',             scoreKey:'flappyBird.bestScore',      tags:['one-button','runner'],                     keywords:['flappy bird','tap'], demo:true, gamepad:true },
    { file:'freecell.html',       name:'FreeCell Solitaire',        emoji:'🃏',  category:'strategy',       desc:'Sort every card back home.',              tags:['cards','solitaire'],              keywords:['solitaire','cards'], top:9, demo:true },
    { file:'klondike.html',       name:'Klondike Solitaire',        emoji:'🏔️',  category:'strategy',       desc:'Arrange cards into foundation piles.',              tags:['cards','solitaire'],              keywords:['solitaire','cards'], demo:true },
    { file:'froggit.html',        name:'Froggit',         emoji:'🐸',  category:'arcade',       desc:'Dodge traffic and cross the river.',         scoreKey:'frogger.bestScore',         tags:['classic','retro'],                        keywords:['frogger','crossy road','frog'], top:9, demo:true, gamepad:true },
    { file:'geometryJump.html',   name:'Geometry Jump',   emoji:'🔺',  category:'arcade',       desc:'Dodge all the obstacles.',                scoreKey:'geometryDash.bestProgress', tags:['runner','rhythm'],                keywords:['geometry dash','rhythm runner','spikes'], demo:true, gamepad:true },
    { file:'powerwing.html',        name:'Powerwing',       emoji:'🚀',  category:'construction', desc:'Blast through the levels.',     scoreKey:'gradius.bestScore',         tags:['scrolling','power-ups'],            keywords:['gradius','r-type','salamander','life force','options','shmup'], gamepad:true },
    { file:'jetdash.html',    name:'Jetdash',         emoji:'🪂',  category:'construction', desc:'Boost to dodge the obstacles.',      scoreKey:'jetpackDash.bestScore',     tags:['runner','one-button'],            keywords:['jetpack joyride','endless runner','jetpack'], gamepad:true },
    { file:'jouster.html',          name:'Jouster',         emoji:'🦅',  category:'construction', desc:'Flap higher than your rival.',            scoreKey:'joust.bestScore',           tags:['flight','classic'],                keywords:['joust','balloon fight','bird knight'], gamepad:true },
    { file:'boomer.html',         name:'Boomer',          emoji:'🎩',  category:'arcade',       desc:'Catch all the bombs.',      scoreKey:'kaboom.bestScore',          tags:['paddle','retro'],                 keywords:['kaboom','atari kaboom','mad bomber'], demo:true, gamepad:true },
    { file:'moonLander.html',    name:'Moon Lander',     emoji:'🌙',  category:'arcade',       desc:'Touch down gently.',           scoreKey:'lunarLander.bestScore',     tags:['physics','retro'],                keywords:['lunar lander','lander','gravity','rocket','spaceflight'], demo:true, gamepad:true },
    { file:'jumpman.html',          name:'Jumpman',         emoji:'🍄',  category:'construction', desc:'Run, jump, and stomp.',           tags:['platformer','side-scroll'],                     keywords:['super mario bros','mario','platformer','brick blocks','goomba'], gamepad:true },
    { file:'matchThree.html',         name:'Match Three',     emoji:'💠',  category:'puzzle',       desc:'Swap gems to match three.',               scoreKey:'match3.bestScore',          tags:['grid','matching'],                keywords:['bejeweled','candy crush','match 3','gems'], demo:true },
    { file:'microRacer.html',     name:'Micro Racer',     emoji:'🏎️', category:'construction', desc:'Race tiny cars on tight tracks.',         scoreKey:'microRacer.bestTime',       tags:['racing','top-down'],              keywords:['micro machines','rc pro am','top down racing'], gamepad:true },
    { file:'minesweeper.html',    name:'Minesweeper',     emoji:'🚩',  category:'strategy',       desc:'Flag all the mines.',        scoreKey:'minesweeper.bestTimes.hard',tags:['grid','classic'],                 keywords:['mines','windows minesweeper'] },
    { file:'miniGolf.html',       name:'Mini Golf',       emoji:'⛳',  category:'sports',       desc:'Putt across tricky little courses.',      scoreKey:'miniGolf.bestScore',        tags:['physics','aim'],                  keywords:['golf','putt putt','crazy golf'] },
    { file:'missileDefense.html', name:'Missile Defense', emoji:'🏙️', category:'arcade',      desc:'Shoot down missiles to save cities.',        scoreKey:'missileCommand.bestScore',  tags:['defense','aim'],              keywords:['missile command','nuke defense','abm','cold war'], top:1, demo:true, gamepad:true },
    { file:'moonbuggy.html',     name:'Moonbuggy',       emoji:'🌔',  category:'construction', desc:'Hop craters and shoot aliens.',    scoreKey:'moonPatrol.bestScore',      tags:['scrolling','runner'],             keywords:['moon patrol','moon buggy','rover'], gamepad:true },
    { file:'motobalance.html',   name:'Motobalance',     emoji:'🏍️', category:'construction', desc:'Throttle and lean to clear the course.',   scoreKey:'Motobalance.bestTime',   tags:['physics','bike'],                 keywords:['stunt bike','motocross','balance','physics bike'], gamepad:true },
    { file:'mrDrill.html',      name:'Drillman',       emoji:'⛏️', category:'construction',       desc:'Dig down for air.',      scoreKey:'mrDriller.bestScore',       tags:['action','digging'],               keywords:['mr driller','dig dug','drilling'], gamepad:true },
    { file:'orbitswarm.html',     name:'OrbitSwarm',      emoji:'🪐',  category:'strategy',      desc:'Build ships and conquer the galaxy.',         tags:['space','strategy'],                keywords:['gravitar','strategy','geometry wars'] },
    { file:'reversi.html',        name:'Reversi',         emoji:'⚫',  category:'board',        desc:'Flank stones to flip them.',              tags:['strategy','2-player'],            keywords:['othello','reversi'], demo:true },
    { file:'pucMan.html',         name:'Maze Munch',         emoji:'👻',  category:'arcade',       desc:'Eat dots and dodge ghosts.',             scoreKey:'pacman.bestScore',          tags:['maze','retro'],                   keywords:['pac-man','pacman','ms pacman','ghosts','maze chase'], demo:true, gamepad:true },
    { file:'pegball.html',         name:'Pegball',         emoji:'🟢',  category:'physics',      desc:'Aim and drop to clear every peg.',             scoreKey:'peggle.bestScore',          tags:['physics','aim'],                  keywords:['peggle','pachinko','peg shooter'], gamepad:true },
    { file:'pinball.html',        name:'Pinball',         emoji:'⚪',  category:'construction', desc:'Launch, flip, and bounce.',          scoreKey:'pinball.bestScore',         tags:['physics','retro'],                keywords:['pinball','flippers','silverball'], gamepad:true },
    { file:'plinko.html',         name:'Plinker',         emoji:'🔵',  category:'construction',      desc:'Drop chips down pegs to score.',               scoreKey:'plinko.bestScore',          tags:['physics','luck'],                 keywords:['plinko','price is right','pachinko'], gamepad:true },
    { file:'speedway.html',   name:'Speedway',        emoji:'🏁',  category:'construction', desc:'Pass other racers and beat the clock.',         scoreKey:'polePosition.bestScore',    tags:['racing','retro','3d'],                 keywords:['pole position','outrun','f1','arcade racer'], gamepad:true },
    { file:'pong.html',           name:'Pong',            emoji:'🏓',  category:'sports',       desc:'Bounce the ball past your opponent.',         tags:['paddle','retro'],                 keywords:['pong','tennis','table tennis'], demo:true, gamepad:true },
    { file:'pool.html',           name:'Pool',            emoji:'🎱',  category:'sports',       desc:'Cue up and sink all the balls.',               scoreKey:'pool.bestShots',            tags:['physics','aim'],                  keywords:['pool','billiards','snooker','cue sports','8-ball','9-ball'], top:3 },
    { file:'gemFighter.html',  name:'Gem Fighter',     emoji:'💢',  category:'construction', desc:'Stack gems to chain combos.',           tags:['falling','matching'],               keywords:['puzzle fighter','super puzzle fighter','street fighter puzzle'], gamepad:true },
    { file:'riverStrike.html',      name:'River Strike',    emoji:'✈️', category:'construction', desc:'Down enemy ships and collect fuel.',         scoreKey:'riverRaid.bestScore',       tags:['scrolling','classic'],            keywords:['river raid','xevious','vertical shmup'], gamepad:true },
    { file:'roboRescue.html',       name:'Robo Rescue',     emoji:'🤖',  category:'shooter',      desc:'Destroy robots and save humans.', scoreKey:'robotron.bestScore',        tags:['twin-stick','retro'],             keywords:['robotron','smash tv','twin stick','robots'], top:2, demo:true, gamepad:true },
    { file:'skiing.html',         name:'Skiing',          emoji:'⛷️', category:'construction', desc:'Carve downhill through the gates.',       scoreKey:'skiing.bestScore',          tags:['racing','retro'],                 keywords:['ski free','slalom','snow','alpine'], gamepad:true },
    { file:'skyhop.html',         name:'Skyhop',          emoji:'🦘',  category:'construction', desc:'Bounce high up the platforms.',    scoreKey:'Skyhop.bestScore',          tags:['endless','vertical'],             keywords:['doodle jump','vertical jumper','icy tower','platform climber'] },
    { file:'snake.html',          name:'Snake',           emoji:'🐍',  category:'arcade',       desc:'Eat to grow and don’t crash.',             scoreKey:'snake.bestScore',           tags:['grid','classic'],                 keywords:['snake','nokia snake','tron'], demo:true, gamepad:true },
    { file:'blastman.html',       name:'Blastman',        emoji:'💣',  category:'construction', desc:'Bomb the blocks and blast every baddie.',      scoreKey:'Blastman.bestScore',        tags:['grid','classic'],                 keywords:['bomberman','dyna blaster','bombs','maze','explode'], gamepad:true },
    { file:'bobblePop.html',          name:'Bobble Pop',      emoji:'🎈',  category:'puzzle',       desc:'Aim and pop matching bubbles.',           scoreKey:'snood.bestScore',           tags:['physics','aim'],                  keywords:['snood','bust a move','puzzle bobble','bubble shooter'], gamepad:true },
    { file:'sokoban.html',        name:'Sokoban',         emoji:'📦',  category:'strategy',       desc:'Push every box onto its target.',         scoreKey:'sokoban.bestLevel',         tags:['grid','classic'],                 keywords:['sokoban','warehouse','box push'], gamepad:true },
    { file:'spaceIntruders.html',  name:'Space Intruders', emoji:'👾',  category:'shooter',      desc:'Shoot marching aliens.',          scoreKey:'spaceInvaders.bestScore',   tags:['retro','space'],                 keywords:['space invaders','galaga','galaxian','aliens'], top:7, demo:true, gamepad:true },
    { file:'sudoku.html',         name:'Sudoku',          emoji:'9️⃣',  category:'puzzle', desc:'Fill the grid with 1-9.',                 scoreKey:'sudoku.bestTimes.hard',     tags:['grid','logic'],                   keywords:['sudoku','number puzzle','logic puzzle','9x9'] },
    { file:'spyDriver.html',      name:'Spy Driver',      emoji:'🕵️', category:'construction', desc:'Drive and shoot.',              scoreKey:'spyhunter.bestScore',       tags:['driving','top-down'],             keywords:['spy hunter','car combat','vehicular combat','road rash'], gamepad:true },
    { file:'tetrix.html',         name:'Tetrix',          emoji:'🟪',  category:'puzzle',       desc:'Stack blocks to clear lines.',      scoreKey:'tetris.bestScore',          tags:['falling','classic'],              keywords:['tetris','tetrimino','blocks'], top:6, demo:true, gamepad:true },
    { file:'wordly.html',         name:'Wordly',          emoji:'🅰️',  category:'puzzle', desc:'Guess the secret word.',         scoreKey:'WordGuess.bestScore',       tags:['word','logic'],                   keywords:['wordle','word game','5 letter','guess the word'] },
    { file:'wulfstein.html',    name:'Wulfstein',       emoji:'🐺',  category:'construction', desc:'Shoot your way out of the castle.',       tags:['first-person','maze','3d'],         keywords:['wolfenstein','wolf','doom','fps','3d shooter','raycaster'], gamepad:true },
    { file:'zoomi.html',           name:'Zoomi',           emoji:'🔮',  category:'construction', desc:'Shoot marbles, match three to pop.',      scoreKey:'zuma.bestScore',            tags:['matching','aim'],                 keywords:['zuma','luxor','marble shooter','chain pop'], gamepad:true },

    // ---- Extra games (debug-only). Finished/experimental games not yet on the
    //      main floor; the 'extra' category is gated to debug mode everywhere. ----

    { file:'musicSequencer.html',      name:'Music Sequencer',  emoji:'🎹',  category:'extra', desc:'Tap the grid to build a beat.',            tags:['music','toy'],                    keywords:['drum machine','beat maker','music tracker','step sequencer','tr-808'] },
    { file:'go.html',             name:'Go',              emoji:'⚪',  category:'extra',        desc:'Surround territory on a 9×9 board.',      tags:['strategy','2-player'],            keywords:['go','baduk','weiqi','igo'] },
    { file:'captureGo.html',      name:'Capture Go',      emoji:'⭕',  category:'extra',        desc:'First to capture wins (Atari Go).',        tags:['strategy','2-player'],            keywords:['atari go','capture go','first capture','baduk'] },
    { file:'slotDemon.html',      name:'Slot Demon',      emoji:'🎰',  category:'extra',        desc:'Spin the reels and tempt fate.',          tags:['luck','casino'],                  keywords:['slots','slot machine','jackpot','gambling','fruit machine'] },
];

GAMES.sort((a, b) => a.name.localeCompare(b.name));
const gameByFile = Object.fromEntries(GAMES.map(g => [g.file, g]));

// Engine templates (templates/ folder) — starter projects shown ONLY when the
// debug build is active (littlejsDebug() / ?debug=1). They live OUTSIDE the GAMES
// array on purpose, so random / recent / welcome rows never surface them; they
// appear only as a separate bucket at the bottom of the sidebar list. Order is
// curated (the default starter first), not alphabetized.
const TEMPLATES = [
    { file:'game.html',          name:'Default Starter',    emoji:'🎮', desc:'Minimal engine loop with the default sprite atlas.', tags:['starter','atlas'] },
    { file:'menuGame.html',      name:'Menu Starter',       emoji:'📋', desc:'Title, pause, options & dialogs via menus.js.',      tags:['menus','ui'] },
    { file:'boardGame.html',     name:'Board / Grid',       emoji:'🎲', desc:'Scaffolding for grid & board games.',                tags:['grid','board'] },
    { file:'cardsGame.html',     name:'Cards',              emoji:'🃏', desc:'Starting point for card games.',                     tags:['cards'] },
    { file:'box2dGame.html',     name:'Box2D Physics',      emoji:'⚙️', desc:'Box2D rigid-body physics setup.',                    tags:['physics','box2d'] },
    { file:'textureGame.html',   name:'Procedural Sprites', emoji:'🎨', desc:'Build sprite atlases from canvas draw ops.',         tags:['sprites','texture'] },
    { file:'tweakableGame.html', name:'Live Tweakables',    emoji:'🎛️', desc:'Mark globals as runtime-tweakable sliders.',          tags:['tweak','dev'] },
    { file:'uiGame.html',        name:'Canvas UI',          emoji:'🎚️', desc:'Canvas-drawn menus & sliders (UISystemPlugin).',     tags:['ui','plugin'] },
    { file:'defaultAtlas.html',  name:'Default Atlas',      emoji:'✨', desc:'Showcase of the 16 built-in atlas icons.',           tags:['atlas','icons'] },
];
const templateByFile = Object.fromEntries(TEMPLATES.map(t => [t.file, t]));
// Combined lookup for selectGame / hash routing / titles — no file-name collisions
// between games and templates. isTemplate() decides directory + dev-only behavior.
const infoByFile = { ...gameByFile, ...templateByFile };
const isTemplate = f => !!templateByFile[f];

// Games that support DEMO MODE — the hero cabinet rotates through these, loading
// each with #demo so it runs menu-less and self-running. Derived from the per-game
// `demo:true` flag so a game is never listed in two places.
const DEMO_GAMES = GAMES.filter(g => g.demo).map(g => g.file);

// Games pinned to the FRONT of the hero rotation (shuffled among themselves so a
// different one can open each visit), then the rest of DEMO_GAMES follow. Derived
// from the per-game `hero:true` flag. Featured games should also have `demo:true`.
const FEATURED_GAMES = GAMES.filter(g => g.hero).map(g => g.file);
const isFeatured = file => FEATURED_GAMES.includes(file);

// Games whose source uses the gamepad API — drives the 🎮 chip on cards/tiles.
// Derived from the per-game `gamepad:true` flag.
const GAMEPAD_GAMES = new Set(GAMES.filter(g => g.gamepad).map(g => g.file));
const hasGamepad = g => GAMEPAD_GAMES.has(g.file);
