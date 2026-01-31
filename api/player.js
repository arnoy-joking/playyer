export default function handler(req, res) {
  // Destructure all possible YouTube parameters from the URL
  const { id, ...params } = req.query;

  if (!id) {
    return res.status(400).send("Provide a YouTube ID: ?id=VIDEO_ID");
  }

  // Convert all extra URL parameters into a YouTube string
  // This lets you use ANY YouTube setting (e.g., &controls=0&mute=1)
  const searchParams = new URLSearchParams(params);
  
  // YouTube requires 'playlist' to be set to the same ID for looping to work
  if (params.loop === '1' && !params.playlist) {
    searchParams.append('playlist', id);
  }

  const ytUrl = `https://www.youtube.com/embed/${id}?${searchParams.toString()}`;

  const html = `
    <!DOCTYPE html>
    <html style="margin:0;padding:0;height:100%;width:100%;overflow:hidden;">
      <body style="margin:0;padding:0;height:100%;width:100%;background:#000;">
        <iframe 
          src="${ytUrl}" 
          style="border:none;width:100vw;height:100vh;" 
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen" 
          allowfullscreen>
        </iframe>
      </body>
    </html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(html);
}
