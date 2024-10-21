
function ReplaceAlls(MainTexts, SearchText, ReplaceWith) {
    if (MainTexts + "" === "") {
        return MainTexts + "";
    }
    var escapeRegExp = SearchText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    var newStr = MainTexts.replace(new RegExp(escapeRegExp, 'g'), ReplaceWith);
    return newStr;
}
function CopyText(str, IsAskConfirmToCopy = '0', IsShowSuccessMessage = "0") {
    str = ReplaceAlls(str, "<br>", "\n");
    str = ReplaceAlls(str, "<br />", "\n");
    str = ReplaceAlls(str, "<br/>", "\n");

    if (IsAskConfirmToCopy !== '0') {
        Swal.fire({
            title: "Are you sure you want to Copy This Text?",
            text: "",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: 'Yes'
        }).then((res) => {
            if (res.value) {
                var el = document.createElement('textarea');
                el.value = str;
                el.setAttribute('readonly', '');
                el.style.position = 'absolute';
                el.style.left = '-9999px';
                document.body.appendChild(el);
                el.select();
                document.execCommand('copy');
                document.body.removeChild(el);

                if (IsShowSuccessMessage === "1") {
                    swalToast("Copied Successfully", "success", "top", "1000");
                }
            } else {
                //Swal.fire("Your imaginary file is safe!");
            }
        });
    }
    else {
        var el = document.createElement('textarea');
        el.value = str;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);

        if (IsShowSuccessMessage === "1") {
            swalToast("Copied Successfully", "success", "top", "1000");
        }
    }
}


function swalToast(msgs, types = "warning", pos = "top", time = "3000") {
    if (strUndefined(types) === "") { types = "warning"; }
    if (strUndefined(pos) === "") { pos = "top"; }
    if (strUndefined(time) === "") { time = "3000"; }

    msgs = MakeProperSwalMsg(msgs);

    //if (types === "success")
    {
        const Toast = Swal.mixin({
            toast: true,
            position: pos, //top, top-start, top-end, center, center-start, center-end, bottom, bottom-start, bottom-end
            showConfirmButton: false,
            timer: time,
            timerProgressBar: true,
            onOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
        Toast.fire({
            icon: types,
            title: msgs
        });
    }
}



function MakeProperSwalMsg(msg) {
    msg = strUndefined(msg);

    msg = msg.replace("Cannot roll back t1. No transaction or savepoint of that name was found.", "");
    msg = msg.replace("Cannot roll back t2. No transaction or savepoint of that name was found.", "");
    msg = msg.replace("Cannot roll back t3. No transaction or savepoint of that name was found.", "");
    msg = msg.replace("Cannot roll back t4. No transaction or savepoint of that name was found.", "");
    msg = msg.replace("Cannot roll back t5. No transaction or savepoint of that name was found.", "");

    msg = msg.replace("Transaction count after EXECUTE indicates a mismatching number of BEGIN and COMMIT statements. Previous count = 1, current count = 2.", "");

    msg = ReplaceAlls(msg, "ERROR :", "");

    msg = msg.trim();

    return msg;
}



function swalHtmlMessage(strHtml, btnText, strIcon) {
    if (strHtml + "" === "undefined" || strHtml + "" === "") {
        return;
    }
    if (btnText + "" === "undefined" || btnText + "" === "") {
        btnText = "OK";
    }
    if (strIcon + "" === "undefined") {
        strIcon = "";
    }

    strHtml = MakeProperSwalMsg(strHtml);

    strHtml = strHtml.replace("ERROR :", "").trim();
    strHtml = strHtml.replace(/\#-n#/g, "\n").trim();
    strHtml = ReplaceAlls(strHtml, "^$", "'");

    Swal.fire({
        html: strHtml,
        icon: strIcon,
        confirmButtonText: btnText
    });
}



function swalTitleTextMessage(strTitle, strIcon, strText, btnText) {
    if (strUndefined(strTitle) === "") {
        return;
    }
    if (strUndefined(btnText) === "") {
        btnText = "OK";
    }
    if (strUndefined(strIcon) === "") {
        strIcon = "";
    }

    strText = MakeProperSwalMsg(strText);

    strTitle = strTitle.replace("ERROR :", "").trim();

    Swal.fire({
        title: strTitle,
        text: strText,
        icon: strIcon,
        confirmButtonText: btnText
    });
}



function SetClientSideSession(SessionName, SessionValue) {
    sessionStorage.setItem(SessionName, SessionValue);
}

function GetClientSideSession(SessionName) {
    var aa = sessionStorage.getItem(SessionName) + "";
    if (aa + "" === "null") {
        return "";
    }
    return aa;
}



function RemovePopover(element) {
    $("" + element).attr("data-toggle", "").attr("data-trigger", "").attr("data-placement", "").attr("data-content", "");
}



function AutoDownloadFile(filename, fileTitle) {
    //Source : h ttps://jsfiddle.net/rce6nn3z/
    var element = document.createElement('a');
    element.setAttribute('href', filename);
    element.setAttribute('download', fileTitle);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);

    //AutoDownloadFileWithText("hello.txt", "This is the content of my file :)");
}


function GetBrowserName() {
    var result = "CHROME";
    $.ajax({
        beforeSend: function () {
            showLoader();
        },
        complete: function () {
            hideLoader();
        },
        type: "POST",
        url: '/Common3/GetBrowserName',
        data: {},
        async: false,
        success: function (response) {
            result = response
        },
        error: function (xhr, status, error) {
            result = "";
            //$("#" + BKCenterCtrlID).selectpicker('refresh');
        }
    });

    /*$.browser.chrome = /chrome/.test(navigator.userAgent.toLowerCase());
    if ($.browser.chrome) {
        //alert("You are using Chrome!");
        BrowserName = "chrome";
        $.browser.safari = false;
    }
    if ($.browser.safari) {
        //alert("You are using Safari!");
        BrowserName = "safari";
        $.browser.mozilla = false;
    }
    if ($.browser.mozilla) {
        //alert("You are using firefox!");
        BrowserName = "mozilla";
    }*/

    return result;
}



function CommonPartialView(ViewName, ModelValue, CtrlDivHtml, Async, IsReplaceWithDiv = 0, IsShowLoaderBeforeSend = 1, IsHideLoaderAtComplete = 1) {
    //$("#" + CtrlDivHtml).html(strGLoader);
    $.ajax({
        beforeSend: function () {
            if (IsShowLoaderBeforeSend == 1) {
                showLoader();
            }
        },
        complete: function () {
            if (IsHideLoaderAtComplete == 1) {
                hideLoader();
            }
        },
        type: "POST",
        url: '/Common3/Dashboard_CommonPartialView',
        data: { ViewName: ViewName, ModelValue: ModelValue },
        async: Async,
        success: function (response) {
            if (IsReplaceWithDiv + "" === "1") {
                $("#" + CtrlDivHtml).replaceWith(response);
            }
            else {
                $("#" + CtrlDivHtml).html(response);
            }
        },
        error: function (xhr, status, error) {
            $("#" + CtrlDivHtml).html("<div class='text-center'>Please Try Again</div>");
        }
    });
}



function strUndefined(str1, str2 = "", str3 = "", str4 = "", str5 = "") {
    var ReturnVal = "";

    str1 = str1 + "";
    str2 = str2 + "";
    str3 = str3 + "";
    str4 = str4 + "";
    str5 = str5 + "";

    if ((str1 + "").trim() == "undefined") {
        if ((str2 + "").trim() == "undefined") {
            if ((str3 + "").trim() == "undefined") {
                if ((str4 + "").trim() == "undefined") {
                    if ((str5 + "").trim() == "undefined") {
                        ReturnVal = "";
                    }
                    else if (str5 !== "") {
                        ReturnVal = (str5 + "").trim();
                    }
                }
                else if (str4 !== "") {
                    ReturnVal = (str4 + "").trim();
                }
            }
            else if (str3 !== "") {
                ReturnVal = (str3 + "").trim();
            }
        }
        else if (str2 !== "") {
            ReturnVal = (str2 + "").trim();
        }
    }
    else {
        ReturnVal = (str1 + "").trim();
    }

    if (ReturnVal + "" == "null") {
        ReturnVal = "";
    }

    return ReturnVal;
}

function intUndefined(int1, int2 = "", int3 = "", int4 = "", int5 = "") {
    var ReturnVal = 0;

    /*int1 = int1;
    int2 = int2;
    int3 = int3;
    int4 = int4;
    int5 = int5;*/

    if ((int1 + "").trim() == "undefined") {
        if ((int2 + "").trim() == "undefined") {
            if ((int3 + "").trim() == "undefined") {
                if ((int4 + "").trim() == "undefined") {
                    if ((int5 + "").trim() == "undefined") {
                        ReturnVal = 0;
                    }
                    else if (int5 !== "") {
                        ReturnVal = (int5 + "").trim();
                    }
                }
                else if (int4 !== "") {
                    ReturnVal = (int4 + "").trim();
                }
            }
            else if (int3 !== "") {
                ReturnVal = (int3 + "").trim();
            }
        }
        else if (int2 !== "") {
            ReturnVal = (int2 + "").trim();
        }
    }
    else {
        ReturnVal = (int1 + "").trim();
    }


    if (parseInt(ReturnVal) + "" === "NaN") {
        ReturnVal = 0;
    }

    if (ReturnVal + "" == "null") {
        ReturnVal = 0;
    }

    return parseInt(ReturnVal);
}

function boolUndefined(bool1, bool2 = false, bool3 = false, bool4 = false, bool5 = false) {
    var ReturnVal = false;

    if (bool1 + "" == "undefined") {
        if (bool2 + "" == "undefined") {
            if (bool3 + "" == "undefined") {
                if (bool4 + "" == "undefined") {
                    if (bool5 + "" == "undefined") {
                        ReturnVal = false;
                    }
                    else if (bool5 !== "") {
                        ReturnVal = bool5;
                    }
                }
                else if (bool4 !== "") {
                    ReturnVal = bool4;
                }
            }
            else if (bool3 !== "") {
                ReturnVal = bool3;
            }
        }
        else if (bool2 !== "") {
            ReturnVal = bool2;
        }
    }
    else {
        ReturnVal = bool1;
    }


    if (ReturnVal + "" === "NaN") {
        ReturnVal = false;
    }

    if (ReturnVal + "" == "null") {
        ReturnVal = false;
    }

    return ReturnVal;
}




function IsFunctionExists(fn) {
    if (typeof fn == "function") {
        return true;
    }

    if ((typeof fn) + "" == "undefined") {
        return false;
    }

    try {
        if (typeof fn != "undefined" && $.isFunction(fn)) {
            return true;
        }
    } catch (e) {
        return false;
    }
    return false;
}

function IsElementExists(el) {
    el = strUndefined(el);
    el = el.replace("#", "");

    if ($("#" + el).length) {
        return true;
    }
    return false;
}

function IsResultHaveError(result) {
    if (result.substring(0, 7).toUpperCase() === "ERROR :") {
        return true;
    }
    return false;
}




function SetHttpCookie_ServerSide_2(CookieName, CookieValue, IsEncrypt) {
    $.ajax({
        beforeSend: function () {
        },
        complete: function () {
        },
        type: "POST",
        url: '/Common3/SetHttpCookie_ServerSide',
        data: { CookieName: CookieName, CookieValue: CookieValue, IsEncrypt: IsEncrypt },
        async: true,
        success: function (response) {
            //
        },
        error: function (xhr, status, error) {
            //
        }
    });
}

function GetHttpCookie_ServerSide_2(CookieName, IsDecrypt) {
    var result = "";
    $.ajax({
        beforeSend: function () {
        },
        complete: function () {
        },
        type: "POST",
        url: '/Common3/GetHttpCookie_ServerSide',
        data: { CookieName: CookieName, IsDecrypt: IsDecrypt },
        async: false,
        success: function (response) {
            result = strUndefined(response);
        },
        error: function (xhr, status, error) {
            return "";
        }
    });

    return result;
}



function SetSession_ServerSide(SessionName, SessionValue, IsEncrypt) {
    $.ajax({
        beforeSend: function () {
        },
        complete: function () {
        },
        type: "POST",
        url: '/Common2/SetSession_ServerSide',
        data: { SessionName: SessionName, SessionValue: SessionValue, IsEncrypt: IsEncrypt },
        async: true,
        success: function (response) {
            //
        },
        error: function (xhr, status, error) {
            //
        }
    });
}

function GetSession_ServerSide(SessionName, IsDecrypt) {
    var result = "";
    $.ajax({
        beforeSend: function () {
        },
        complete: function () {
        },
        type: "POST",
        url: '/Common2/GetSession_ServerSide',
        data: { SessionName: SessionName, IsDecrypt: IsDecrypt },
        async: false,
        success: function (response) {
            result = strUndefined(response);
        },
        error: function (xhr, status, error) {
            return "";
        }
    });

    return result;
}



function IsStringContains(MainString, ContainsString) {
    if (MainString.indexOf(ContainsString) >= 0) {
        return true;
    }
    return false;
}

function IsDivVisible(div) {
    if ($(div).is(':visible')) {
        return true
    }
    return false;
}



function RefreshWebsite() {
    window.location.href = "/";
}


