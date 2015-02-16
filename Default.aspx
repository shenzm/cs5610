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
                <a class="zhenmins-nav-brand" href="#">ZhenminG's</a>
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

    <div class="zhenmins-container">
        <div class="zhenmins-col-sm-12 zhenmins-col-lg-8">
            <div class="panel" id="main-div">
                <div class="panel-heading">Welcome to my demo page</div>
                <div class="panel-body">
                    <img data-src="holder.js/200x200" class="img-thumbnail"
                         src="images/zhenming.jpg" style="width: 200px; height: 200px;">
                    <p><b>Name: Zhenming Shen</b></p>
                    <p><b>NUID: 001998546</b></p>
                    <p>Hey guys! This is Zhenming's demo page for cs5610.</p>
                    <p>Git Repository: 
                        <a href="https://github.com/shenzm/cs5610.git" target="_blank">
                            https://github.com/shenzm/cs5610.git
                        </a>
                    </p>
                </div>
            </div>
        </div>
        <div id="utilities" class="zhenmins-col-sm-12 zhenmins-col-lg-4">
            <div class="panel">
                <div class="panel-heading">Utilities</div>
                <div class="panel-body">
                    <ul class="list-group">
                        <li class="list-group-item"><a href="sitestatistics/" target="_blank">SiteStatistics</a></li>
                        <li class="list-group-item"><a href="statistics/" target="_blank">Statistics</a></li>
                        <li class="list-group-item"><a href="source/" target="_blank">Source</a></li>
                        <li class="list-group-item"><a href="search/" target="_blank">Search</a></li>
                        <li class="list-group-item"><a href="searchtree/" target="_blank">SearchTree</a></li>
                        <li class="list-group-item"><a href="textview/" target="_blank">TextView</a></li>
                        <li class="list-group-item"><a href="filelist.aspx" target="_blank">FileList</a></li>
                        <li class="list-group-item"><a href="autofile.aspx" target="_blank">AutoFile</a></li>
                        <li class="list-group-item"><a href="images/autoimage.aspx" target="_blank">Images</a></li>
                        <li class="list-group-item"><a href="blog/" target="_blank">Blog</a></li>
                    </ul>
                </div>
            </div>
        </div>
        <div id="home-nav-bottom" class="zhenmins-col-lg-12 zhenmins-col-sm-12">
            <div class="panel">
                <div class="panel-heading">Navigation Links</div>
                <div class="panel-body">
                    <ul class="list-group nav-list-bottom">
                        <li class="list-group-item"><a href="story/index.htm?../experiments/" target="_blank">Experiements</a></li>
                        <li class="list-group-item"><a href="#" target="_blank">Project</a></li>
                        <li class="list-group-item"><a href="#" target="_blank">Documentation</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>

</body>
</html>
