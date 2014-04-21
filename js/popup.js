$(function(){

	$('#generate_btn').click(function(){
		if(!running){
			$('.result').show();
			run();
		} else {
			$('.notice').text('生成器正在运行');
		}
	});

	function getOptions(){
		var options = {};
		$('.options input:checkbox:checked').each(function(i, obj){
			var $obj = $(obj);
			options[$obj.attr('id')] = true;
		});
		options['length'] = $('.options #length').val();
		return options;
	}

	var lowerCases = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
	var upperCases = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
	var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
	var punctuations = [",", ".", "/", "<", ">", "?", ";", ":", "[", "]", "{", "}", "|", "=", "-", "+", "_", "(", ")", "*", "&", "^", "%", "$", "#", "@", "!", "~"];

	var options = {};
	var running = false;

	function run(){
		options = getOptions();
		var flag = isValidLength(options.length);
		var arr = [], length = options.length - 0;
		console.log(flag, options.length);
		if(!flag || length == 0){
			$('.notice').text('长度应为大于0的整数');
			return;
		}
		
		if(options.lowerCase){
			arr = arr.concat(lowerCases);
		}
		if(options.upperCase){
			arr = arr.concat(upperCases);
		}
		if(options.number){
			arr = arr.concat(numbers);
		}
		if(options.punctuation){
			arr = arr.concat(punctuations);
		}
		
		if(arr.length > 0){
			$('.notice').text('');
			puzzle();
		} else {
			$('.notice').text('请选至少一项');
		}

		var times = 0;

		function puzzle(){
			running = true;
			window.setTimeout(function(){
				$('#password_result').text(generate(arr, length));
				times++;
				if(times < 20){
					puzzle();
				} else {
					running = false;
				}
			}, 200);
		}
	}

	function generate(arr, length){
		var password = '';
		for(var i=0;i<length;i++){
			var random = Math.floor(Math.random() * arr.length);
			password = password + arr[random];
		}
		console.log(password);

		return isValidPassword(password) ? password : generate(arr, length);
	}

	function isValidPassword(password){
		var flag = true;
		if(options.lowerCase){
			flag = flag && containsCharInArr(password, lowerCases);
		}
		if(options.upperCase){
			flag = flag && containsCharInArr(password, upperCases);
		}
		if(options.number){
			flag = flag && containsCharInArr(password, numbers);
		}
		if(options.punctuation){
			flag = flag && containsCharInArr(password, punctuations);
		}
		return flag;
	}

	function containsCharInArr(password, arr){
		var flag = false, pswArr = password.split('');
		for(var i =0;i<pswArr.length;i++){
			if(arr.indexOf(pswArr[i]) > -1){
				flag = true;
				break;
			}
		}
		return flag;
	}

	function isValidLength(lengthStr){
		var flag = true, arr = lengthStr.split('');
		for(var i=0;i<arr.length;i++){
			var charStr = arr[i];
			if(numbers.indexOf(charStr) == -1 || i == 0 && numbers.indexOf(charStr) < 1 ){
				flag = false;
				break;
			}
		}

		return flag;
	}
});