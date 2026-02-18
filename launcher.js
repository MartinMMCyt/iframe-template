document.getElementById("launch").onclick = () => {
    const win = window.open("about:blank", "_blank");

    const html = `
<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>${CONFIG.gameName}</title>
<style>
html,body{margin:0;height:100%;background:black;overflow:hidden;}
iframe{width:100%;height:100%;border:none;}
</style>
</head>
<body>
<iframe src="${CONFIG.gameURL}"
allow="fullscreen; gamepad; pointer-lock"
sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-forms">
</iframe>
</body>
</html>
`;

    win.document.open();
    win.document.write(html);
    win.document.close();
};
