# frmifrm.js

表单提交目标使用隐藏 `<iframe>`，从而实现页面无刷新交互。需要 `jQuery` 支持。

## Sample

<p align="center">form1.html</p>

    <script src="js/jquery.min.js"></script>
    <script src="js/frmifrm.js"></script>
    // ... ...
    <form action="frmifrm.html" method="post" class="frmifrm" 
          onsuccess="function(result){alert(result);}" 
          onfailure="function(error){alert(error);}"
          oncomplete="function(){alert('compeleted!');}">
    // ... ...
    </form>

<p align="center">form2.html</p>

    <script src="js/jquery.min.js"></script>
    <script src="js/frmifrm.js"></script>
    // ... ...
    <form action="frmifrm.html" method="post" class="frmifrm">
    // ... ...
    </form>
    <script type="text/javascript">
    (function(){
        $(".frmifrm").on("success", function (event, result){
            alert(result);
        }).on("failure", function(event, error){
            alert(error);
        }).on("complete", function(){
            alert("compeleted!");
        });
    })();
    </script>

<p align="center">frmifrm.html</p>

    <script src="js/jquery.min.js"></script>
    <script src="js/frmifrm.js"></script>
    <scrpit>
        var result = "OK";
        frmifrm.success(result);
        // var error = "Error";
        // frmifrm.failure(error);
    </script>

