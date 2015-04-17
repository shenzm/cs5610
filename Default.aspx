<%@ Page Language="C#" %>

<script runat="server">
    // This demo page has no server side script
</script>

<!DOCTYPE html>
<html lang="en">
<head>
    <title>Demo Home Page</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="css/normalize.css" />
    <link rel="stylesheet" href="css/home.css"/>
</head>
<body>
    <nav class="zhenmins-nav zhenmins-nav-fixed-top">
        <div class="zhenmins-container">
            <div class="zhenmins-nav-header">
                <a class="zhenmins-nav-redirect" href="#home-nav-bottom">Navs</a>
                <a class="zhenmins-nav-brand">ZhenminG's</a>
            </div>
            <div class="zhenmins-nav-body" id="home-nav-body">
                <ul class="nav-list">
                    <li><a href="story/index.htm?../experiments/" target="_blank">Experiements</a></li>
                    <li><a href="#" target="_blank">Project</a></li>
                    <li><a href="#" target="_blank">Documentation</a></li>
                </ul>
            </div>
        </div>
    </nav>

    <div class="main-frame">
        <div class="zhenmins-col-sm-12">
            <img data-src="holder.js/200x200" class="img-thumbnail" src="images/zhenming.jpg">
            <h3>Hi! I'm Zhenming</h3>
            <p>This is my demo home page for CS5610 - Web Development.</p>
            <p>In this course, I gained strong knowledge of front&back-end technologies.</p>
            <p>And I adopt MEAN stack for my single-page app project.</p>
            <p class="git-link">Git repo: <a target="_blank" href="https://github.com/shenzm/cs5610.git">click here</a></p>
        </div>
        <div class="box"></div>
    </div>

    <div class="nav-frame">
        <div id="home-nav-bottom" class="zhenmins-col-lg-12 zhenmins-col-sm-12">
            <p class="utility-header"> Navigation Links: </p>
            <ul class="utility-list">
                <li class="utility-item"><a href="story/index.htm?../experiments/" target="_blank">Experiements</a></li>
                <li class="utility-item"><a href="#" target="_blank">Project</a></li>
                <li class="utility-item"><a href="#" target="_blank">Documentation</a></li>
            </ul>
        </div>
        <div class="box"></div>
    </div>

    <div class="utilities-frame">
        <div class="zhenmins-col-sm-12">
            <p class="utility-header"> Here are the utilities: </p>
            <ul class="utility-list">
                <li class="utility-item"><a href="sitestatistics/" target="_blank">SiteStatistics</a></li>
                <li class="utility-item"><a href="statistics/" target="_blank">Statistics</a></li>
                <li class="utility-item"><a href="source/" target="_blank">Source</a></li>
                <li class="utility-item"><a href="search/" target="_blank">Search</a></li>
                <li class="utility-item"><a href="searchtree/" target="_blank">SearchTree</a></li>
                <li class="utility-item"><a href="textview/" target="_blank">TextView</a></li>
                <li class="utility-item"><a href="filelist.aspx" target="_blank">FileList</a></li>
                <li class="utility-item"><a href="autofile.aspx" target="_blank">AutoFile</a></li>
                <li class="utility-item"><a href="images/autoimage.aspx" target="_blank">Images</a></li>
                <li class="utility-item"><a href="blog/" target="_blank">Blog</a></li>
            </ul>
        </div>
        <div class="box"></div>
     </div>

</body>
</html>
