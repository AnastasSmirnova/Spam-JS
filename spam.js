var request=require('request');
var url="http://www.mosigra.ru/";
var rep_url=[];
rep_url.push(url); //список url     push альтернатива  append(добавить в массив)
var rep_email=[];
var i=0;
var url_new=rep_url[0];
function F(url,list_new,list_new1, url_new, body){   
    var list = body.match(/[a-zA-Z0-9][-a-zA-Z0-9_.]*\@[-a-zA-Z]+\.[a-z]{2,6}/ig);//email//флаг(i-учитывать любой регистр g-нахожу все совпадение=возврат массива)
    for (var x in list){
        if (!(list_new.includes(list[x]))) {
            list_new.push(list[x]);
            console.log(list[x]);
        }
	//else console.log("ununique");
    }     
    list = body.match(/<a href="(http\:\/\/[-+\w.\/$#%]+)\"/ig); //  http
    for (x in list) {
        var ssilka=list[x].substr(9, list[x].length - 10);
            if (ssilka.startsWith(url) && !(list_new1.includes(ssilka))) {
                list_new1.push(ssilka);
            }
    }
	/*for( var i=0; i<list_new1.length;i++){
		console.log("HTTP " + list_new1[i]);	
	}*/
    list = body.match( /<a href="(\/[-+\w:\/#.&%$@]*)\"/ig);   //obrub http
    for (x in list) {
        ssilka=list[x].substr(10, list[x].length - 11);
        var url1=url + ssilka;
        if (!(list_new1.includes(url1))) {
            list_new1.push(url1);
        }
    }
	/*for( var i=0; i<list_new1.length;i++){
		console.log("obrub http " + list_new1[i]);	
	}*/
    return;
}

request(url_new, function (err, res, body) {
    while (i<10) {
        url_new = rep_url[i];
	//console.log("request " + url_new);
        F(url,rep_email,rep_url, url_new, body);
        i++;
    }
});