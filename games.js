let allGames = [];

// JSON load
fetch("games.json")
  .then(res => res.json())
  .then(data => {
    allGames = data;
    console.log("Games loaded:", allGames);
  })
  .catch(err => console.error("Error loading games.json", err));

// Search function
function searchGames(query) {
  query = query.trim().toLowerCase();
  if (!query) return [];

  return allGames.filter(game =>
    game.title.toLowerCase().includes(query) ||
    game.tags.some(tag => tag.toLowerCase().includes(query))
  );
}

// Example: call this when user types
document.querySelector(".search-input").addEventListener("input", e => {
  const results = searchGames(e.target.value);
  console.log("Search results:", results); // test output

  const container = document.getElementById("searchResults");
  container.innerHTML = results.length ?
    results.map(game => `
        <div onclick="playGame(${game.id})">
          <img src="${game.img}" width="50">
          <span>${game.title}</span>
        </div>
      `).join("") :
    "<p style='color:white'>No games found</p>";
});

// Play Game + Recently Played
function playGame(id) {
  const game = allGames.find(g => g.id === id);
  if (!game) return;

  let recent = JSON.parse(localStorage.getItem("recentlyPlayed") || "[]");
  recent = recent.filter(g => g.id !== game.id);
  recent.unshift(game);
  if (recent.length > 6) recent.pop();
  localStorage.setItem("recentlyPlayed", JSON.stringify(recent));

  window.location.href = game.link;
}






  /* 
  ,
  {
    "id": "127",
    "title": "Peet Sneak",
    "link": "https://games.cdn.famobi.com/html5games/p/peet-sneak/v010/?fg_domain=play.famobi.com&fg_aid=A1000-1&fg_uid=552a182d-4fa6-4d1b-bbd0-28d5b4a07743&fg_pid=4638e320-4444-4514-81c4-d80a8c662371&fg_beat=686&original_ref=https%3A%2F%2Ffamobi.com%2F",
    "img": "images/peetsneak.webp",
    "description": "<b style='font-size:20px'>Peet Sneak – Stealth Puzzle Adventure Game</b><br><b>Peet Sneak</b> is a fun and strategic <b>stealth puzzle game</b> where you guide a sneaky character through dangerous corridors filled with guards and obstacles. The game combines <b>timing, planning, and smart movement</b> to create an exciting and addictive experience.<br><br><b style='font-size:20px'>Objective</b><br>The main objective is to <b>collect keys, unlock doors, and reach the final destination</b> without getting caught by guards.<br><br><b style='font-size:20px'>Gameplay</b><br>In <b>Peet Sneak</b>, players control a character who must <b>move carefully through levels while avoiding guard detection</b>.<br><br>Guards patrol different areas, and you need to <b>observe their movement patterns</b> to pass safely.<br><br>You can <b>sneak behind certain guards</b> to neutralize them, but others are more dangerous and must be avoided completely. <br><br>The game also includes <b>keys, locked doors, and puzzle elements</b> that require strategic thinking to progress. <br><br>As levels increase, layouts become more complex, making the game more challenging and rewarding.<br><br><b style='font-size:20px'>Strategy & Tips</b><br>To succeed in <b>Peet Sneak</b>, always watch guard movements before making a move.<br><br>Use timing and patience instead of rushing, and plan your path carefully.<br><br><b style='font-size:20px'>Features</b><br><b>Stealth-based puzzle gameplay</b>.<br><b>Guard avoidance and strategy mechanics</b>.<br><b>Key collection and door unlocking</b>.<br><b>Increasing level difficulty</b>.<br><b>Simple controls with deep strategy</b>.<br><b>Playable instantly</b> in browser without download.<br><br><b style='font-size:20px'>Controls</b><br><b>PC:</b> Use <b>mouse</b> to move and interact.<br><b>Mobile:</b> Tap or hold to control movement.<br><br><hr><div style='font-size:14px;color:#aaa;'><b>Credit:</b> Game provided by Famobi platform. All rights belong to the original developers and publishers.</div>",
    "tags": ["Assassin","Hunting"],
    "category": ["Funny","kid","puzzle","html5","adventure"],
"developer": "Famobi"
  },
  {
    "id": "128",
    "title": "Tower Smash",
    "link": "https://games.cdn.famobi.com/html5games/t/tower-smash/6c087c9f/?fg_domain=play.famobi.com&fg_aid=A1000-1&fg_uid=ef52244c-7368-4df0-830e-4c87298249b1&fg_pid=4638e320-4444-4514-81c4-d80a8c662371&fg_beat=709&original_ref=https%3A%2F%2Ffamobi.com%2F",
    "img": "",
    "description": "<b style='font-size:20px'>Tower Smash – Addictive Helix Smash Arcade Game</b><br><b>Tower Smash</b> is a fast-paced <b>arcade skill game</b> where you control a bouncing ball and smash your way down through a rotating tower. With simple controls and intense gameplay, it offers a highly addictive experience.<br><br><b style='font-size:20px'>Objective</b><br>The main objective is to <b>reach the bottom of the tower</b> by smashing through platforms while avoiding dangerous obstacles.<br><br><b style='font-size:20px'>Gameplay</b><br>In <b>Tower Smash</b>, players guide a ball that continuously bounces on a tower made of stacked platforms. You must <b>tap at the right moment</b> to break through the layers and move downward.<br><br>There are two types of platforms: <b>colored platforms</b> that can be smashed and <b>black platforms</b> that will destroy your ball instantly if touched. <br><br>If you smash multiple platforms in a row, you build a combo that activates <b>fire mode</b>, allowing you to break even the dangerous platforms for a short time. <br><br>The game becomes more difficult as you progress, with faster movement and more tricky platform patterns.<br><br><b style='font-size:20px'>Strategy & Tips</b><br>To succeed in <b>Tower Smash</b>, focus on <b>timing your taps carefully</b> instead of tapping randomly.<br><br>Build combos to activate fire mode and clear difficult sections easily.<br><br><b style='font-size:20px'>Features</b><br><b>Simple one-tap controls</b>.<br><b>Fast-paced arcade gameplay</b>.<br><b>Combo-based fire mode system</b>.<br><b>Endless tower challenge</b>.<br><b>Colorful visuals and smooth animations</b>.<br><b>Playable instantly</b> in browser without download.<br><br><b style='font-size:20px'>Controls</b><br><b>PC:</b> Click <b>mouse</b> to smash.<br><b>Mobile:</b> Tap the screen to play.<br><br><hr><div style='font-size:14px;color:#aaa;'><b>Credit:</b> Game provided by Famobi platform. All rights belong to the original developers and publishers.</div>",
    "tags": [],
"developer": "Famobi"
  },
  {
    "id": "129",
    "title": "Ultimate Boxing",
    "link": "https://games.cdn.famobi.com/html5games/u/ultimate-boxing/v020/?fg_domain=play.famobi.com&fg_aid=A1000-1&fg_uid=734d35f4-9606-4a19-9016-acc6081879a2&fg_pid=4638e320-4444-4514-81c4-d80a8c662371&fg_beat=275&original_ref=https%3A%2F%2Ffamobi.com%2F",
    "img": "images/ultimateboxing.webp",
    "description": "<b style='font-size:20px'>Ultimate Boxing – Intense 1v1 Fighting Game</b><br><b>Ultimate Boxing</b> is a fast-paced <b>sports fighting game</b> where you step into the ring and battle opponents using skill, timing, and strategy. The game delivers an exciting boxing experience with simple controls and competitive gameplay.<br><br><b style='font-size:20px'>Objective</b><br>The main objective is to <b>defeat your opponent in the ring</b> by landing powerful punches and avoiding incoming attacks.<br><br><b style='font-size:20px'>Gameplay</b><br>In <b>Ultimate Boxing</b>, players choose a boxer and fight in <b>1v1 matches</b> against strong opponents.<br><br>You must <b>attack, defend, and dodge at the right moment</b> to gain the upper hand in the fight.<br><br>The game focuses on <b>timing and strategy</b> rather than random punching, so predicting your opponent’s moves is very important. <br><br>You can perform different punches like <b>jabs, hooks, and powerful hits</b> to knock your opponent down and win the match. <br><br>Each fight becomes more challenging as opponents get stronger, requiring better reflexes and smarter tactics.<br><br><b style='font-size:20px'>Strategy & Tips</b><br>To succeed in <b>Ultimate Boxing</b>, focus on <b>defense and counter-attacks</b> instead of attacking continuously.<br><br>Wait for the right moment to strike and avoid wasting energy on unnecessary moves.<br><br><b style='font-size:20px'>Features</b><br><b>1v1 boxing matches</b>.<br><b>Timing-based combat system</b>.<br><b>Attack, block, and dodge mechanics</b>.<br><b>Challenging opponents</b>.<br><b>Simple controls with strategic depth</b>.<br><b>Playable instantly</b> in browser without download.<br><br><b style='font-size:20px'>Controls</b><br><b>PC:</b> Use <b>keyboard</b> to move, attack, and defend.<br><b>Mobile:</b> Tap buttons to punch and block.<br><br><hr><div style='font-size:14px;color:#aaa;'><b>Credit:</b> Game provided by Famobi platform. All rights belong to the original developers and publishers.</div>",
    "tags": [],
    "category": [],
"developer": "Famobi"
  },
  {
    "id": "130",
    "title": "Animal Quiz",
    "link": "https://games.cdn.famobi.com/html5games/a/animal-quiz/v680/?fg_domain=play.famobi.com&fg_aid=A1000-1&fg_uid=a5db53c9-e8fe-47c5-aba3-8148d460a4f3&fg_pid=4638e320-4444-4514-81c4-d80a8c662371&fg_beat=277&original_ref=https%3A%2F%2Ffamobi.com%2F",
    "img": "images/animalquiz.webp",
    "description": "<b style='font-size:20px'>Animal Quiz – Fun Animal Guessing Puzzle Game</b><br><b>Animal Quiz</b> is an entertaining <b>educational puzzle game</b> where you test your knowledge of animals by identifying them from pictures. It combines <b>fun learning, memory, and observation skills</b> to create an engaging experience for all ages.<br><br><b style='font-size:20px'>Objective</b><br>The main objective is to <b>guess the correct animal name</b> by looking at the image and selecting the right letters.<br><br><b style='font-size:20px'>Gameplay</b><br>In <b>Animal Quiz</b>, each level shows an <b>image of an animal</b>, and you must identify it using the given letters.<br><br>You need to <b>arrange the correct letters</b> to form the animal’s name and move to the next level.<br><br>The game features <b>hundreds of levels</b> with animals ranging from common to rare species, making it both fun and challenging. <br><br>As you progress, the difficulty increases, requiring better knowledge and sharper observation skills.<br><br><b style='font-size:20px'>Strategy & Tips</b><br>To succeed in <b>Animal Quiz</b>, carefully observe small details in the image like color, shape, and features.<br><br>If you get stuck, try guessing based on familiar patterns or known animals.<br><br><b style='font-size:20px'>Features</b><br><b>Educational and fun gameplay</b>.<br><b>Image-based animal guessing</b>.<br><b>Hundreds of challenging levels</b>.<br><b>Improves memory and knowledge</b>.<br><b>Simple and user-friendly interface</b>.<br><b>Playable instantly</b> in browser without download.<br><br><b style='font-size:20px'>Controls</b><br><b>PC:</b> Use <b>mouse</b> to select letters.<br><b>Mobile:</b> Tap on letters to form the answer.<br><br><hr><div style='font-size:14px;color:#aaa;'><b>Credit:</b> Game provided by Famobi platform. All rights belong to the original developers and publishers.</div>",
    "tags": [],
    "category": [],
"developer": "Famobi"
  }*/