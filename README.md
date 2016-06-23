# frmifrm.js

表单提交目标使用隐藏 `<iframe>`，从而实现页面无刷新交互。需要 `jQuery` 支持。

## Sample

<p align="center">form.html</p>

    <script src="js/jquery.min.js"></script>
    <script src="js/frmifrm.js"></script>
    // ... ...
    <form action="frmifrm.html" method="post" class="frmifrm" 
          onsuccess="function(result){alert(result);}" 
          onfailure="function(error){alert(error);}">
    // ... ...
    </form>

<p align="center">frmifrm.html</p>

    <script src="js/jquery.min.js"></script>
    <script src="js/frmifrm.js"></script>
    <scrpit>
        var result = "OK";
        frmifrm.success(result);
        // var error = "Error";
        // frmifrm.failure(error);
    </script>

