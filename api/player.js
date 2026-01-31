export default function handler(req, res) {
  // Extract all possible YouTube parameters from the URL
  const { 
    id, 
    autoplay = 0, 
    controls = 1, 
    loop = 0, 
    modest = 0, 
    start, 
    end,
    mute = 0 
  } = req.query;

  if (!id) {
    return res.status(400).send("Error: Missing 'id' parameter.");
  }

  // Construct the official YouTube Embed URL
  let ytUrl = `https://www.youtube.com/embed/${id}?autoplay=${autoplay}&controls=${controls}&modestbranding=${modest}&mute=${mute}`;
  
  if (loop == 1) ytUrl += `&loop=1&playlist=${id}`;
  if (start) ytUrl += `&start=${start}`;
  if (end) ytUrl += `&end=${end}`;

  // Return a clean HTML page with the player
  const html = `
    <body style="margin:0;background:#000;">
      <iframe width="100%" height="100%" src="${ytUrl}" 
        frameborder="0" allow="autoplay; encrypted-media" allowfullscreen>
      </iframe>
    </body>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}