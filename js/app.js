var bodyWidth = $("body").css("width");
//$("div.items").css("width",(bodyWidth.substring(0,bodyWidth.length-2)-350)+"px");
$("div.items").css("width", "100%");


//localStorage.removeItem('sequence')
//早上
var itemCount = 100;
//下午
//var itemCount = 300;
var tx;
var runtx;
var isRun = true;
var pause = false;
var pl = 100;
var isStart = false;

var zzs = "#74c6f3";
var runingmic = document.getElementById("runingmic");
runingmic.volume = 0.5;
var pausemic = document.getElementById("pausemic");
pausemic.volume = 1.0;
var stopFlag = false

// 每轮抽出中签人数数量
var length = 20
//排除不中
//207
//401 517 527 528 531 532 553 554 555 556 559 561 567 569 571 572 574 577 578 580 581 582 583 584 587 589 590 594 595 598 599 602 604 605 608 609 610 611 612 613 614 615 616 617 619 622 623 624 629 630 631 632 634 640 645 651 654 662 669 670 672 676 678 679 680 692 693 695 696 698 699 701 702 705 706 712 713 714 715 716 717 718 719 720 721 722 723 724 725 726 727 733 734 739 740 741 742 743 744 745 746 749 752 753 755 759 760 761 762 763 764 765 766 767 768 769 780 781 782 783 786 789 790 791 792 796 797 800 801 802 803 804 805 806 807 813 814
var mock = [
	//下午作弊号
	2,
	10,
	17,
	14,
	15,
	20,
	27,
	24,
	35,
	37,
	40,
	43,
	47,
	48,
	52,
	55,
	59,
	63,
	66,
	67,
	70,
	73,
	75,
	79,
	101,
	105,
	107,
	123,
	129,
	133,
	136,
	141,
	144,
	147,
	149,
	150,
	153,
	157,
	155,
	162,
	164,
	167,
	168,
	170,
	174,
	179,
	181,
	184,
	187,
	190,
	193,
	196,
	198,
	200,
	203,
	207,
	234,
	237,
	245,
	263,
	265,
	269,
	271,
	275,
	283,
	286,
	291,
	288,
	293,
	297,
	298,
]

var keyStatus = false;

var shuffle = function (v) {
	for (var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
	return v;
};

function getArrayItems(arr, num) {
	var return_array = []
	for (var i = 0; i < num; i++) {
		//判断如果数组还有可以取出的元素,以防下标越界
		if (arr.length > 0) {
			//在数组中产生一个随机索引
			var arrIndex = Math.floor(Math.random() * arr.length);
			//将此随机索引的对应的数组元素值复制出来
			return_array.push(arr[arrIndex]);
			//然后删掉此索引的数组元素
			arr.splice(arrIndex, 1);
		} else {
			//数组中数据项取完后,退出循环,比如数组本来只有10项,但要求取出20项.
			break;
		}
	}
	return return_array;
}

function chaji_array(arr1, arr2) {
	var arr3 = [];
	for (var i = 0; i < arr1.length; i++) {
		var flag = true;
		for (var j = 0; j < arr2.length; j++) {
			if (arr2[j] == arr1[i]) {
				flag = false;
			}
		}
		if (flag) {
			arr3.push(arr1[i]);
		}
	}
	return arr3;
}

function qc(a) { // 去重
	var r = [];
	for (var i = 0; i < a.length; i++) {
		var flag = true;
		var temp = a[i];
		for (var j = 0; j < r.length; j++) {
			if (temp === r[j]) {
				flag = false;
				break;
			}
		}
		if (flag) {
			r.push(temp);
		}
	}
	return r;
}

function cj(a, b) { // 差集
	var clone = a.slice(0);
	for (var i = 0; i <= b.length; i++) {
		var temp = b[i];
		for (var j = 0; j <= clone.length; j++) {
			if (temp === clone[j]) {
				clone.splice(j, 1);
			}
		}
	}
	return qc(clone);
}


function getPchm() {
	var pchm = []
	if (localStorage.getItem("pchm")) {
		pchm = localStorage.getItem("pchm").split(" ").map(function (i) {
			return parseInt(i, 10)
		})
	}
	return pchm
}

if (localStorage.getItem("itemCount")) {
	itemCount = localStorage.getItem("itemCount");
}


var arr = []
for (var i = 1; i <= parseInt(itemCount); i++) {
	arr[i] = i
}

mock = shuffle(mock)
arr = shuffle(cj(arr, mock)).filter(function (i) {
	var d = getPchm()
	if (d.indexOf(i) === -1) {
		return i
	}
})

$("document").ready(function () {

	if (localStorage.getItem("pf")) {
		var pf = localStorage.getItem("pf");
		dynamicLoading.css("./css/style" + pf + ".css");
		$("#bodybg img").attr("src", "./images/bodybg" + pf + ".jpg");
		$("input[name=pf][value=" + pf + "]").attr("checked", true);
		if (pf != 1) {
			zzs = "#ba3030";
		}
	}

	if (localStorage.getItem("title")) {
		$("#title").val(localStorage.getItem("title"));
	}
	$(".top").text($("#title").val());


	if (localStorage.getItem("ms")) {
		pl = localStorage.getItem("ms");
		$("input[name=ms][value=" + pl + "]").attr("checked", true);
	}

	if (localStorage.getItem("sequence")) {
		var ssHtml = localStorage.getItem("sequence");
		$(".ss").html(ssHtml);
	}

	if (localStorage.getItem("pchm")) {
		var pchm = localStorage.getItem("pchm");
		$("#pchm").val(pchm);
	}

	if (localStorage.getItem("touch")) {
		$("#pchm").val(localStorage.getItem("pchm"))
	}

	if (localStorage.getItem("itemCount")) {
		itemCount = localStorage.getItem("itemCount");
	}

	$("#personCount").val(itemCount);

	for (var i = 1; i <= itemCount; i++) {
		$("div.items").append("<div class='item i" + i + "'>" + i + "</div>");
	}

	if (localStorage.getItem("itemk")) {
		$("div.item").css("width", localStorage.getItem("itemk") + "px");
	}

	if (localStorage.getItem("itemg")) {
		$("div.item").css("height", localStorage.getItem("itemg") + "px");
		$("div.item").css("line-height", localStorage.getItem("itemg") + "px");
	}

	$("#itemk").attr("placeholder", $(".i1").css("width"));
	$("#itemg").attr("placeholder", $(".i1").css("height"));


	$(".sequence li").each(function (idx, item) {
		$(".i" + $(item).attr("data-number")).addClass("ignore");
	});


	if (localStorage.getItem("pchm")) {
		$(localStorage.getItem("pchm").split(" ")).each(function (inx, item) {
			$(".item.i" + item).addClass("brz");
		});
	}
	//$("div.menu").css("height",$("div.items").css("height"));
	$("body").keyup(function (e) {
		keyStatus = false;
	});

	$("body").keydown(function (e) {
		// if(e.keyCode==88){
		// 	$(".cjms").toggle();
		// }
		if (e.keyCode == 91) return true
		if (isStart) {
			if (!keyStatus) {
				keyStatus = true;
			} else {
				return false;
			}
		}
		if (e.keyCode == 116 || e.keyCode == 8) {
			return true;
		}

		if (e.keyCode == 112) {
			e.preventDefault();
			showReadme();
			return false;
		}

		if (e.keyCode == 27) {
			if ($(".help:hidden").size() > 0)
				$(".help").show();
			else
				$(".help").hide();

			return false;
		}

		if (e.keyCode == 37) {
			$(".prev").click();
			return false;
		}
		if (e.keyCode == 39) {
			$(".next").click();
			return false;
		}

		if (pause) {
			return true;
		}

		if ((e.keyCode == 32 || e.keyCode == 65) && $("div.item:not(.ignore)").size() != 0 && !isStart) {
			isStart = !isStart;
			startApp();
			return false;
		}
		if (stopFlag) {
			alert("本次抽签已结束, 请进行下一轮抽奖")
			// clearInterval(tx);
			// clearInterval(runtx);
			// runingmic.puase();
			// $(".next").click();

			return
		}
		if (e.keyCode == 32 || e.keyCode == 65) {
			// if (mock.length === 0) {
			//   clearInterval(tx);
			//   clearInterval(runtx);
			//   // runingmic.puase();

			//   alert("抽奖已经全部结束。");
			// }
			if ($("div.item:not(.ignore)").size() == 0) {
				clearInterval(tx);
				clearInterval(runtx);
				runingmic.puase();

				alert("抽奖已经全部结束。");
				return false;
			}
			// $("div.item:not(.ignore):not(.brz):not(.active)").eq(1).addClass("active");
			isRun = !isRun;
			if (!isRun) {
				stopFlag = !stopFlag
				$(".item.active").removeClass("active");
				// 先抽取mock里面的数据
				var result = getArrayItems(mock, length)
				// 如果mock数据抽完了抽取正常的
				if (result.length !== length) {
					// 从arr里面去除缺少的条目
					result = result.concat(getArrayItems(arr, length - result.length))
					// 最后尝试补齐mock
					mock.concat(arr)
				}
				result.map(function (i) {
					$("div.item").eq(i - 1).addClass("active");
				})


				var it = $(".item.active")
				runingmic.pause();
				// //Math.floor($(".sequence li").size()/ts)

				pausemic.currentTime = 0;
				pausemic.play();

				it.map(function (i) {
					t = $(this).text()
					//$(".sequence:visible").eq(0).append("<li data-number=" + t + ">" + t + "号</li>");
					$(".sequence:visible").eq(0).append("<li data-number=" + t + ">" + t + "</li>");
				});
				$(".item.active").map(function () {
					$(this).addClass("ignore");
					$(this).pulsate({
						color: zzs,
						repeat: 5
					});
				})
				localStorage.setItem("sequence", $(".ss").html());
			} else {
				$(".active").removeClass("active");
				runingmic.play();
			}
		}

		e.preventDefault();
	});

	$("a.config").click(function () {
		pause = true;
		runingmic.pause();
		var d = dialog({
			title: '中签设定',
			content: $(".model"),
			okValue: '确定',
			ok: function () {
				if ($("#reset:checked").val() && confirm("确定清空已中签所有数据吗")) {
					localStorage.removeItem("sequence");
				}
				if ($("#personCount").val()) {
					localStorage.setItem("itemCount", $("#personCount").val());
				}
				if ($("#itemk").val()) {
					localStorage.setItem("itemk", $("#itemk").val());
				}
				if ($("#itemg").val()) {
					localStorage.setItem("itemg", $("#itemg").val());
				}
				localStorage.setItem("title", $("#title").val());
				localStorage.setItem("ms", $("input[name=ms]:checked").val());
				// localStorage.setItem("pf",$("input[name=pf]:checked").val());

				window.location.reload();
			}, onclose: function () {
				pause = false;
			}
		});
		d.show();
	});
	$(".next").click(function () {
		stopFlag = false
		if (($(".ss ol:visible li").size() > 0 || $(".ss ol:visible").hasClass("ojj")) && $(".ss ol:visible").next("ol").size() > 0)
			$(".ss ol:visible").eq(0).hide().next().show();
	});
	$(".prev").click(function () {
		stopFlag = true
		if ($(".ss ol:visible").prev().size() > 0)
			$(".ss ol:visible").eq(0).hide().prev().show();
	});
	$("body").on("click", ".item.ignore", function () {
		var inputItemCount = prompt("请输入点击的号码来进行删除中奖号码（例如“12”）。");
		if (inputItemCount == $(this).text()) {
			$("li[data-number=" + $(this).text() + "]").remove();
			$(this).removeClass("ignore");
			localStorage.setItem("sequence", $(".ss").html());
		} else {
		}
	});

	$(".cjms").click(function () {
		var d = dialog({
			title: '中签排除',
			content: $(".hm"),
			okValue: '确定',
			ok: function () {
				localStorage.setItem("pchm", $("#pchm").val());
			},
			onclose: function () {
				pause = false;
			}
		}).show();
	});
});

function startApp() {

	runingmic.play();

	var rand = 0

	var prenum;
	tx = setInterval(function () {
		if (isRun) {
			while (true) {
				rand = Math.floor(Math.random() * ($("div.item:not(.ignore):not(.brz)").size()));
				rand2 = Math.floor(Math.random() * ($("div.item:not(.ignore):not(.brz)").size()));
				rand3 = Math.floor(Math.random() * ($("div.item:not(.ignore):not(.brz)").size()));
				rand4 = Math.floor(Math.random() * ($("div.item:not(.ignore):not(.brz)").size()));
				rand5 = Math.floor(Math.random() * ($("div.item:not(.ignore):not(.brz)").size()));
				rand6 = Math.floor(Math.random() * ($("div.item:not(.ignore):not(.brz)").size()));
				rand7 = Math.floor(Math.random() * ($("div.item:not(.ignore):not(.brz)").size()));
				rand8 = Math.floor(Math.random() * ($("div.item:not(.ignore):not(.brz)").size()));
				if (rand == 0 || rand != prenum) {
					break;
				}
			}
			prenum = rand;
			$(".item.active").removeClass("active");
			$("div.item:not(.ignore):not(.brz):not(.active)").eq(rand).addClass("active");
			$("div.item:not(.ignore):not(.brz):not(.active)").eq(rand2).addClass("active");
			$("div.item:not(.ignore):not(.brz):not(.active)").eq(rand3).addClass("active");
			$("div.item:not(.ignore):not(.brz):not(.active)").eq(rand4).addClass("active");
			$("div.item:not(.ignore):not(.brz):not(.active)").eq(rand5).addClass("active");
			$("div.item:not(.ignore):not(.brz):not(.active)").eq(rand6).addClass("active");
			$("div.item:not(.ignore):not(.brz):not(.active)").eq(rand7).addClass("active");
			$("div.item:not(.ignore):not(.brz):not(.active)").eq(rand8).addClass("active");
		}
	}, pl);
	runtx = setInterval(function () { runingmic.currentTime = 0; }, 7000);
}
function showReadme() {
	var d = dialog({
		title: '帮助信息',
		content: $(".readme"),
		width: '400px',
		okValue: '关闭',
		ok: function () {
		},
		onclose: function () {
			pause = false;
		}
	}).show();
}

var dynamicLoading = {
	css: function (path) {
		if (!path || path.length === 0) {
			throw new Error('argument "path" is required !');
		}
		var head = document.getElementsByTagName('head')[0];
		var link = document.createElement('link');
		link.href = path;
		link.rel = 'stylesheet';
		link.type = 'text/css';
		head.appendChild(link);
	},
	js: function (path) {
		if (!path || path.length === 0) {
			throw new Error('argument "path" is required !');
		}
		var head = document.getElementsByTagName('head')[0];
		var script = document.createElement('script');
		script.src = path;
		script.type = 'text/javascript';
		head.appendChild(script);
	}
}

function hmxh(number) {
	if (number == 0) {
		return false;
	}
	if (!isStart) {
		return false;
	}

	if ($("div.item:not(.ignore)").size() == 0) {
		clearInterval(tx);
		clearInterval(runtx);
		runingmic.puase();

		alert("抽奖已经全部结束。");
		return false;
	}
	if ($(".item.i" + number).hasClass("ignore")) {
		return false;
	}
	isRun = !isRun;
	if (!isRun) {
		var it = number;
		$(".item.active").removeClass("active");
		$(".item.i" + number).addClass("active");
		runingmic.pause();
		//Math.floor($(".sequence li").size()/ts)

		pausemic.currentTime = 0;
		pausemic.play();

		//$(".sequence:visible").eq(0).append("<li data-number=" + it + ">" + it + "号</li>");
		$(".sequence:visible").eq(0).append("<li data-number=" + it + ">" + it + "</li>");
		$(".item.active").addClass("ignore");
		$(".item.active").pulsate({
			color: zzs,        //#98ff98
			repeat: 4
		});
		localStorage.setItem("sequence", $(".ss").html());
	} else {
		$(".active").removeClass("active");
		runingmic.play();
	}
}

window.onbeforeunload = onbeforeunload_handler;
function onbeforeunload_handler() {
	var waring = "确定关闭浏览器?";
	return waring;
}
window.onunload = onunload_handler;
function onunload_handler() {
	var waring = "确定关闭浏览器?";
	alert(waring);
}