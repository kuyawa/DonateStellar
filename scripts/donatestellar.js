// DonateStellar v1.0

var DonateStellar = (function(){

    var styleSource = '<style>'+
        '#donatexlm-modal { z-index:  999; position: fixed; top: 0; left: 0; bottom: 0; right: 0; width: 100%; height: 100%; text-align: center; }'+
        '#donatexlm-modbg { z-index: -999; position: fixed; top: 0; left: 0; bottom: 0; right: 0; width: 100%; height: 100%; background-color: #000; opacity: 0.6; text-align: center; }'+
        '#donatexlm-form  { z-index: 9999; position: fixed; top: 0; left: 0;/*bottom: 0;*/ right: 0; max-width: 560px; margin: 20px auto; padding: 20px; background-color: #FFF; border: 1px solid #CCC; border-radius: 4px; text-align: center; box-shadow: 0 0 40px rgba(0,0,0,1); }'+
        '#donatexlm-logo { text-align: center; }'+
        '#donatexlm-cause { text-align: center; font-size: 1.2em; }'+
        '#donatexlm-testnet { display: none; color: #C00; font-weight: bold; }'+
        '#donatexlm-address { text-align: center; font-size: 1.2em; font-family: monospace; word-wrap: break-word; }'+
        '#donatexlm-qrcode { width: 200px; height: 200px; margin: 0 auto; }'+
        '#donatexlm-qrcode img { width: 200px; height: 200px; }'+
        '#donatexlm-actions button { padding: 3px 20px; background-color: #CCC; border: 1px solid #AAA; border-radius: 3px; }'+
        '#donatexlm-actions button:hover  { color: #000; background-color: #DDD; cursor: pointer; }'+
        '#donatexlm-actions button:active { color: #333; background-color: #AAA; }'+
        '#donatexlm-after { padding: 10px 0; }'+
        '@media screen and (max-width: 980px) and (orientation: portrait) {'+
        ' #donatexlm-form { bottom: 0; margin: 0 auto; padding: 10px; } '+
        '}'+
        '</style>';

    // Included for faster load times
    var buttonImg = "data:image/jpg;base64,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";

    var formTemplate = styleSource+
        '<li id="donatexlm-logo"><img src="'+buttonImg+'"></li>'+
        '<li>Please donate any amount of XLM to the following address for a good cause'+
        '<li  id="donatexlm-cause"><b>{cause}</b></li>'+
        '<li>Include code {refid} in the memo field for confirmation'+
        '<li  id="donatexlm-testnet">Test net - Do not send real money.</li>'+
        '<li  id="donatexlm-address">{address}</li>'+
        '<div id="donatexlm-qrcode"></div>'+
        '<li  id="donatexlm-after">Donations usually take less than 10 secs to confirm. After donation is sent please wait for confirmation</li>'+
        '<li  id="donatexlm-actions"><button onclick="DonateStellar.onConfirm()">CONFIRM</button> <button onclick="DonateStellar.onCancel()">CANCEL</button></li>'+
        '<li  id="donatexlm-results"></li>';
        //'<a href="{intent}" target="_blank"><div id="donatexlm-qrcode"></div></a>'+
        //'<li>If you are on mobile</li><li>touch the QR-Code to take you to your wallet</li>';


    function donation(event, options) {
        var already  = $('donatexlm-form');
        if(already) { hideModal(); return; }
        if(options) { setup(options); }
        var refid    = newid();
        var event    = event || window.event
        var source   = event.target;
        var memo     = escape(refid); // unescape on client
        var intent   = 'stellar://payment/'+state.options.address+'/10/'+memo+'/';
        state.refid  = refid;

        // Build modal popup
        var modal   = document.createElement('div');
        var modbg   = document.createElement('div');
        var form    = document.createElement('div');
        var content = formTemplate.replace('{cause}', state.options.cause).replace('{refid}',refid).replace('{address}',state.options.address).replace('{intent}',intent);
        
        modal.setAttribute('id', 'donatexlm-modal');
        modbg.setAttribute('id', 'donatexlm-modbg');
        form.setAttribute('id',  'donatexlm-form');
        form.innerHTML = content;
        modal.appendChild(modbg);
        modal.appendChild(form);
        document.body.appendChild(modal);
        $('donatexlm-testnet').style.display = state.options.horizon=='test'?'block':'none';

        showQrcode();
        checkDonations(refid);
    }

    function checkDonations(refid) {
        console.log('Checking for donations...');
        if(state.options.horizon=='live') {
            var server = new StellarSdk.Server('https://horizon.stellar.org');
        } else {
            var server = new StellarSdk.Server('https://horizon-testnet.stellar.org');
        }

        state.channel = server.transactions().forAccount(state.options.address).cursor('now').stream({
            onmessage: function(transaction) {
                console.log('On transaction...', transaction);
                if(transaction.memo == refid) {
                    console.log('Found it ', refid);
                    onDonation(refid, transaction.id);
                }
            },
            onerror: function(error) {
                error.target.close(); // Close stream
                // TODO: Check if account is valid
                console.error('Streaming Error: ', error);
                alert('Error confirming donation. Try again later');
            }
        });
    }

    function onDonation(refid, txid) {
        console.log('Donation received', txid);
        hideModal();
        state.channel   = null;
        state.confirmid = refid;
        state.txid      = txid;
        state.options.onConfirm(state.refid, state.txid);
    }

    function onConfirm() {
        if(!state.confirmid){
            alert('Donation not received yet.\nPlease wait for confirmation.');
        }
    }

    function onCancel() {
        hideModal();
        state.confirmid = null; // Reset to avoid issues
        if(state.channel) { state.channel(); } // Close stream
        state.options.onCancel();
    }

    function confirmed() {
        var cid = state.confirmid;
        state.confirmid = null; // Reset to avoid multiple calls
        return cid;
    }

    function hideModal() {
        var modal = $('donatexlm-modal');
        modal.style.display = 'none';
        modal.parentNode.removeChild(modal);
    }

    function showQrcode() {
        //console.log('Generating qrcode...');
        new QRCode('donatexlm-qrcode', state.options.address);
    }

    function getState() {
        return state;  // For debugging only
    }


    //---- UTILS

    function $(id)   { return document.getElementById(id); }
    function newid() { return (''+((new Date()).getTime())).substr(7,6); }
    function epoch() { return (new Date()).getTime(); }

    function money(text, dec=2, comma=false) {
        var num = 0;
        if(comma){
            num = parseFloat(text).toLocaleString("en", {minimumFractionDigits: dec, maximumFractionDigits: dec});
        } else {
            num = parseFloat(text).toFixed(dec);
        }
        return num;
    }

    function webget(url, callback, target) {
        var http = new XMLHttpRequest();
        http.open("GET", url, true);
        http.onreadystatechange = function() { 
            if(http.readyState==4) { 
                //console.log('Response: '+http.responseText);
                var json = null;
                try { 
                    json = JSON.parse(http.responseText); 
                } catch(ex) { 
                    console.log("JSON ERROR", ex.message); 
                    console.log('RESPONSE', http.responseText); 
                    //alert('Connection error');
                    json = { error: true, message: ex.message };
                }
                callback(json, target);
            } 
        };
        http.send();
    }


    //---- MAIN

    var baseOptions = {
        horizon     : 'live',
        address     : '',
        cause       : '',
        onConfirm   : function(refid, txid) { alert('Donation confirmed. \nThank you for your support.'); },
        onCancel    : function() {}
    }

    var state = {
        ready     : false, 
        options   : baseOptions,
        txid      : '',
        refid     : '', 
        confirmid : '',
        channel   : null,
        onConfirm : null, 
        onCancel  : null
    };

    function setup(options) {
        if(!options) { options = baseOptions; }
        if(!options.address) { alert('Fatal error: Stellar address not set up.\nRefer to the user guide.'); return; }
        state.options.horizon     = options.horizon || 'live';
        state.options.address     = options.address;
        state.options.cause       = options.cause || '';
        state.options.onConfirm   = options.onConfirm || baseOptions.onConfirm;
        state.options.onCancel    = options.onCancel  || baseOptions.onCancel; 
        options = null;
        state.ready = true;
        this.ready  = true;
    }

    var App = {
        ready     : false,
        setup     : setup,
        donation  : donation,
        confirmed : confirmed,
        getState  : getState,
        onConfirm : onConfirm,
        onCancel  : onCancel
    };

    return App;

})();


//---- QRCODE --------------------------------------------------------------------
// Embedded script to avoid loading external libraries except Stellar
//--------------------------------------------------------------------------------
var QRCode;!function(){function a(a){this.mode=c.MODE_8BIT_BYTE,this.data=a,this.parsedData=[];for(var b=[],d=0,e=this.data.length;e>d;d++){
var f=this.data.charCodeAt(d);f>65536?(b[0]=240|(1835008&f)>>>18,b[1]=128|(258048&f)>>>12,b[2]=128|(4032&f)>>>6,b[3]=128|63&f):f>2048?(b[0]=224|(61440&f)>>>12,
b[1]=128|(4032&f)>>>6,b[2]=128|63&f):f>128?(b[0]=192|(1984&f)>>>6,b[1]=128|63&f):b[0]=f,this.parsedData=this.parsedData.concat(b)}
this.parsedData.length!=this.data.length&&(this.parsedData.unshift(191),this.parsedData.unshift(187),this.parsedData.unshift(239))}
function b(a,b){this.typeNumber=a,this.errorCorrectLevel=b,this.modules=null,this.moduleCount=0,this.dataCache=null,this.dataList=[]}
function i(a,b){if(void 0==a.length)throw new Error(a.length+"/"+b);for(var c=0;c<a.length&&0==a[c];)c++;this.num=new Array(a.length-c+b);
for(var d=0;d<a.length-c;d++)this.num[d]=a[d+c]}function j(a,b){this.totalCount=a,this.dataCount=b}function k(){this.buffer=[],this.length=0}
function m(){return"undefined"!=typeof CanvasRenderingContext2D}function n(){var a=!1,b=navigator.userAgent;
return/android/i.test(b)&&(a=!0,aMat=b.toString().match(/android ([0-9]\.[0-9])/i),aMat&&aMat[1]&&(a=parseFloat(aMat[1]))),a}
function r(a,b){for(var c=1,e=s(a),f=0,g=l.length;g>=f;f++){var h=0;switch(b){case d.L:h=l[f][0];break;case d.M:h=l[f][1];break;case d.Q:h=l[f][2];break;case d.H:h=l[f][3]}if(h>=e)break;c++}
if(c>l.length)throw new Error("Too long data");return c}function s(a){var b=encodeURI(a).toString().replace(/\%[0-9a-fA-F]{2}/g,"a");
return b.length+(b.length!=a?3:0)}a.prototype={getLength:function(){return this.parsedData.length},write:function(a){for(var b=0,c=this.parsedData.length;c>b;b++)a.put(this.parsedData[b],8)}},
b.prototype={addData:function(b){var c=new a(b);this.dataList.push(c),this.dataCache=null},isDark:function(a,b){if(0>a||this.moduleCount<=a||0>b||this.moduleCount<=b)throw new Error(a+","+b);
return this.modules[a][b]},getModuleCount:function(){return this.moduleCount},make:function(){this.makeImpl(!1,this.getBestMaskPattern())},
makeImpl:function(a,c){this.moduleCount=4*this.typeNumber+17,this.modules=new Array(this.moduleCount);for(var d=0;d<this.moduleCount;d++){this.modules[d]=new Array(this.moduleCount);
for(var e=0;e<this.moduleCount;e++)this.modules[d][e]=null}this.setupPositionProbePattern(0,0),this.setupPositionProbePattern(this.moduleCount-7,0),
this.setupPositionProbePattern(0,this.moduleCount-7),this.setupPositionAdjustPattern(),this.setupTimingPattern(),this.setupTypeInfo(a,c),
this.typeNumber>=7&&this.setupTypeNumber(a),null==this.dataCache&&(this.dataCache=b.createData(this.typeNumber,this.errorCorrectLevel,this.dataList)),this.mapData(this.dataCache,c)},
setupPositionProbePattern:function(a,b){for(var c=-1;7>=c;c++)if(!(-1>=a+c||this.moduleCount<=a+c))for(var d=-1;7>=d;d++)-1>=b+d||this.moduleCount<=b+d||(this.modules[a+c][b+d]=c>=0&&6>=c&&(0==d||6==d)||d>=0&&6>=d&&(0==c||6==c)||c>=2&&4>=c&&d>=2&&4>=d?!0:!1)},
getBestMaskPattern:function(){for(var a=0,b=0,c=0;8>c;c++){this.makeImpl(!0,c);var d=f.getLostPoint(this);(0==c||a>d)&&(a=d,b=c)}return b},createMovieClip:function(a,b,c){var d=a.createEmptyMovieClip(b,c),e=1;this.make();
for(var f=0;f<this.modules.length;f++)for(var g=f*e,h=0;h<this.modules[f].length;h++){var i=h*e,j=this.modules[f][h];j&&(d.beginFill(0,100),d.moveTo(i,g),d.lineTo(i+e,g),d.lineTo(i+e,g+e),d.lineTo(i,g+e),d.endFill())}return d},
setupTimingPattern:function(){for(var a=8;a<this.moduleCount-8;a++)null==this.modules[a][6]&&(this.modules[a][6]=0==a%2);
for(var b=8;b<this.moduleCount-8;b++)null==this.modules[6][b]&&(this.modules[6][b]=0==b%2)},setupPositionAdjustPattern:function(){for(var a=f.getPatternPosition(this.typeNumber),b=0;b<a.length;b++)
for(var c=0;c<a.length;c++){var d=a[b],e=a[c];if(null==this.modules[d][e])for(var g=-2;2>=g;g++)for(var h=-2;2>=h;h++)this.modules[d+g][e+h]=-2==g||2==g||-2==h||2==h||0==g&&0==h?!0:!1}},
setupTypeNumber:function(a){for(var b=f.getBCHTypeNumber(this.typeNumber),c=0;18>c;c++){var d=!a&&1==(1&b>>c);this.modules[Math.floor(c/3)][c%3+this.moduleCount-8-3]=d}for(var c=0;18>c;c++){var d=!a&&1==(1&b>>c);
this.modules[c%3+this.moduleCount-8-3][Math.floor(c/3)]=d}},setupTypeInfo:function(a,b){for(var c=this.errorCorrectLevel<<3|b,d=f.getBCHTypeInfo(c),e=0;15>e;e++){var g=!a&&1==(1&d>>e);6>e?this.modules[e][8]=g:8>e?this.modules[e+1][8]=g:this.modules[this.moduleCount-15+e][8]=g}
for(var e=0;15>e;e++){var g=!a&&1==(1&d>>e);8>e?this.modules[8][this.moduleCount-e-1]=g:9>e?this.modules[8][15-e-1+1]=g:this.modules[8][15-e-1]=g}this.modules[this.moduleCount-8][8]=!a},mapData:function(a,b){for(var c=-1,d=this.moduleCount-1,e=7,g=0,h=this.moduleCount-1;h>0;h-=2)
for(6==h&&h--;;){for(var i=0;2>i;i++)if(null==this.modules[d][h-i]){var j=!1;g<a.length&&(j=1==(1&a[g]>>>e));var k=f.getMask(b,d,h-i);k&&(j=!j),this.modules[d][h-i]=j,e--,-1==e&&(g++,e=7)}if(d+=c,0>d||this.moduleCount<=d){d-=c,c=-c;break}}}},
b.PAD0=236,b.PAD1=17,b.createData=function(a,c,d){for(var e=j.getRSBlocks(a,c),g=new k,h=0;h<d.length;h++){var i=d[h];g.put(i.mode,4),g.put(i.getLength(),f.getLengthInBits(i.mode,a)),i.write(g)}for(var l=0,h=0;h<e.length;h++)l+=e[h].dataCount;
if(g.getLengthInBits()>8*l)throw new Error("code length overflow. ("+g.getLengthInBits()+">"+8*l+")");for(g.getLengthInBits()+4<=8*l&&g.put(0,4);0!=g.getLengthInBits()%8;)g.putBit(!1);
for(;;){if(g.getLengthInBits()>=8*l)break;if(g.put(b.PAD0,8),g.getLengthInBits()>=8*l)break;g.put(b.PAD1,8)}return b.createBytes(g,e)},b.createBytes=function(a,b){for(var c=0,d=0,e=0,g=new Array(b.length),h=new Array(b.length),j=0;
j<b.length;j++){var k=b[j].dataCount,l=b[j].totalCount-k;d=Math.max(d,k),e=Math.max(e,l),g[j]=new Array(k);for(var m=0;m<g[j].length;m++)g[j][m]=255&a.buffer[m+c];c+=k;
var n=f.getErrorCorrectPolynomial(l),o=new i(g[j],n.getLength()-1),p=o.mod(n);h[j]=new Array(n.getLength()-1);for(var m=0;m<h[j].length;m++){var q=m+p.getLength()-h[j].length;h[j][m]=q>=0?p.get(q):0}}for(var r=0,m=0;m<b.length;m++)r+=b[m].totalCount;
for(var s=new Array(r),t=0,m=0;d>m;m++)for(var j=0;j<b.length;j++)m<g[j].length&&(s[t++]=g[j][m]);for(var m=0;e>m;m++)for(var j=0;j<b.length;j++)m<h[j].length&&(s[t++]=h[j][m]);return s};
for(var c={MODE_NUMBER:1,MODE_ALPHA_NUM:2,MODE_8BIT_BYTE:4,MODE_KANJI:8},d={L:1,M:0,Q:3,H:2},e={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7},f={PATTERN_POSITION_TABLE:[[],[6,18],[6,22],[6,26],[6,30],[6,34],[6,22,38],[6,24,42],[6,26,46],[6,28,50],
[6,30,54],[6,32,58],[6,34,62],[6,26,46,66],[6,26,48,70],[6,26,50,74],[6,30,54,78],[6,30,56,82],[6,30,58,86],[6,34,62,90],[6,28,50,72,94],[6,26,50,74,98],[6,30,54,78,102],[6,28,54,80,106],[6,32,58,84,110],[6,30,58,86,114],[6,34,62,90,118],[6,26,50,74,98,122],[6,30,54,78,102,126],[6,26,52,78,104,130],[6,30,56,82,108,134],
[6,34,60,86,112,138],[6,30,58,86,114,142],[6,34,62,90,118,146],[6,30,54,78,102,126,150],[6,24,50,76,102,128,154],[6,28,54,80,106,132,158],[6,32,58,84,110,136,162],[6,26,54,82,110,138,166],[6,30,58,86,114,142,170]],G15:1335,G18:7973,G15_MASK:21522,
getBCHTypeInfo:function(a){for(var b=a<<10;f.getBCHDigit(b)-f.getBCHDigit(f.G15)>=0;)b^=f.G15<<f.getBCHDigit(b)-f.getBCHDigit(f.G15);return(a<<10|b)^f.G15_MASK},getBCHTypeNumber:function(a){for(var b=a<<12;f.getBCHDigit(b)-f.getBCHDigit(f.G18)>=0;)b^=f.G18<<f.getBCHDigit(b)-f.getBCHDigit(f.G18);return a<<12|b},
getBCHDigit:function(a){for(var b=0;0!=a;)b++,a>>>=1;return b},getPatternPosition:function(a){return f.PATTERN_POSITION_TABLE[a-1]},getMask:function(a,b,c){switch(a){case e.PATTERN000:return 0==(b+c)%2;
case e.PATTERN001:return 0==b%2;case e.PATTERN010:return 0==c%3;case e.PATTERN011:return 0==(b+c)%3;case e.PATTERN100:return 0==(Math.floor(b/2)+Math.floor(c/3))%2;case e.PATTERN101:return 0==b*c%2+b*c%3;case e.PATTERN110:return 0==(b*c%2+b*c%3)%2;case e.PATTERN111:return 0==(b*c%3+(b+c)%2)%2;
default:throw new Error("bad maskPattern:"+a)}},getErrorCorrectPolynomial:function(a){for(var b=new i([1],0),c=0;a>c;c++)b=b.multiply(new i([1,g.gexp(c)],0));return b},
getLengthInBits:function(a,b){if(b>=1&&10>b)switch(a){case c.MODE_NUMBER:return 10;case c.MODE_ALPHA_NUM:return 9;case c.MODE_8BIT_BYTE:return 8;case c.MODE_KANJI:return 8;default:throw new Error("mode:"+a)}else if(27>b)switch(a){case c.MODE_NUMBER:return 12;
case c.MODE_ALPHA_NUM:return 11;case c.MODE_8BIT_BYTE:return 16;case c.MODE_KANJI:return 10;default:throw new Error("mode:"+a)}else{if(!(41>b))throw new Error("type:"+b);switch(a){case c.MODE_NUMBER:return 14;case c.MODE_ALPHA_NUM:return 13;case c.MODE_8BIT_BYTE:return 16;case c.MODE_KANJI:return 12;
default:throw new Error("mode:"+a)}}},getLostPoint:function(a){for(var b=a.getModuleCount(),c=0,d=0;b>d;d++)for(var e=0;b>e;e++){for(var f=0,g=a.isDark(d,e),h=-1;1>=h;h++)if(!(0>d+h||d+h>=b))
for(var i=-1;1>=i;i++)0>e+i||e+i>=b||(0!=h||0!=i)&&g==a.isDark(d+h,e+i)&&f++;f>5&&(c+=3+f-5)}for(var d=0;b-1>d;d++)for(var e=0;b-1>e;e++){var j=0;
a.isDark(d,e)&&j++,a.isDark(d+1,e)&&j++,a.isDark(d,e+1)&&j++,a.isDark(d+1,e+1)&&j++,(0==j||4==j)&&(c+=3)}for(var d=0;b>d;d++)for(var e=0;b-6>e;
e++)a.isDark(d,e)&&!a.isDark(d,e+1)&&a.isDark(d,e+2)&&a.isDark(d,e+3)&&a.isDark(d,e+4)&&!a.isDark(d,e+5)&&a.isDark(d,e+6)&&(c+=40);
for(var e=0;b>e;e++)for(var d=0;b-6>d;d++)a.isDark(d,e)&&!a.isDark(d+1,e)&&a.isDark(d+2,e)&&a.isDark(d+3,e)&&a.isDark(d+4,e)&&!a.isDark(d+5,e)&&a.isDark(d+6,e)&&(c+=40);for(var k=0,e=0;b>e;e++)for(var d=0;b>d;d++)a.isDark(d,e)&&k++;
var l=Math.abs(100*k/b/b-50)/5;return c+=10*l}},g={glog:function(a){if(1>a)throw new Error("glog("+a+")");return g.LOG_TABLE[a]},gexp:function(a){for(;0>a;)a+=255;for(;a>=256;)a-=255;
return g.EXP_TABLE[a]},EXP_TABLE:new Array(256),LOG_TABLE:new Array(256)},h=0;8>h;h++)g.EXP_TABLE[h]=1<<h;for(var h=8;256>h;h++)g.EXP_TABLE[h]=g.EXP_TABLE[h-4]^g.EXP_TABLE[h-5]^g.EXP_TABLE[h-6]^g.EXP_TABLE[h-8];
for(var h=0;255>h;h++)g.LOG_TABLE[g.EXP_TABLE[h]]=h;i.prototype={get:function(a){return this.num[a]},getLength:function(){return this.num.length},multiply:function(a){for(var b=new Array(this.getLength()+a.getLength()-1),c=0;
c<this.getLength();c++)for(var d=0;d<a.getLength();d++)b[c+d]^=g.gexp(g.glog(this.get(c))+g.glog(a.get(d)));return new i(b,0)},mod:function(a){if(this.getLength()-a.getLength()<0)return this;
for(var b=g.glog(this.get(0))-g.glog(a.get(0)),c=new Array(this.getLength()),d=0;d<this.getLength();d++)c[d]=this.get(d);for(var d=0;d<a.getLength();d++)c[d]^=g.gexp(g.glog(a.get(d))+b);
return new i(c,0).mod(a)}},j.RS_BLOCK_TABLE=[[1,26,19],[1,26,16],[1,26,13],[1,26,9],[1,44,34],[1,44,28],[1,44,22],[1,44,16],[1,70,55],[1,70,44],[2,35,17],[2,35,13],[1,100,80],[2,50,32],[2,50,24],[4,25,9],[1,134,108],[2,67,43],[2,33,15,2,34,16],[2,33,11,2,34,12],[2,86,68],[4,43,27],[4,43,19],[4,43,15],[2,98,78],
[4,49,31],[2,32,14,4,33,15],[4,39,13,1,40,14],[2,121,97],[2,60,38,2,61,39],[4,40,18,2,41,19],[4,40,14,2,41,15],[2,146,116],[3,58,36,2,59,37],[4,36,16,4,37,17],[4,36,12,4,37,13],[2,86,68,2,87,69],[4,69,43,1,70,44],[6,43,19,2,44,20],[6,43,15,2,44,16],[4,101,81],[1,80,50,4,81,51],[4,50,22,4,51,23],[3,36,12,8,37,13],
[2,116,92,2,117,93],[6,58,36,2,59,37],[4,46,20,6,47,21],[7,42,14,4,43,15],[4,133,107],[8,59,37,1,60,38],[8,44,20,4,45,21],[12,33,11,4,34,12],[3,145,115,1,146,116],[4,64,40,5,65,41],[11,36,16,5,37,17],[11,36,12,5,37,13],[5,109,87,1,110,88],[5,65,41,5,66,42],[5,54,24,7,55,25],[11,36,12],[5,122,98,1,123,99],[7,73,45,3,74,46],
[15,43,19,2,44,20],[3,45,15,13,46,16],[1,135,107,5,136,108],[10,74,46,1,75,47],[1,50,22,15,51,23],[2,42,14,17,43,15],[5,150,120,1,151,121],[9,69,43,4,70,44],[17,50,22,1,51,23],[2,42,14,19,43,15],[3,141,113,4,142,114],[3,70,44,11,71,45],[17,47,21,4,48,22],[9,39,13,16,40,14],[3,135,107,5,136,108],[3,67,41,13,68,42],[15,54,24,5,55,25],
[15,43,15,10,44,16],[4,144,116,4,145,117],[17,68,42],[17,50,22,6,51,23],[19,46,16,6,47,17],[2,139,111,7,140,112],[17,74,46],[7,54,24,16,55,25],[34,37,13],[4,151,121,5,152,122],[4,75,47,14,76,48],[11,54,24,14,55,25],[16,45,15,14,46,16],[6,147,117,4,148,118],[6,73,45,14,74,46],[11,54,24,16,55,25],[30,46,16,2,47,17],[8,132,106,4,133,107],
[8,75,47,13,76,48],[7,54,24,22,55,25],[22,45,15,13,46,16],[10,142,114,2,143,115],[19,74,46,4,75,47],[28,50,22,6,51,23],[33,46,16,4,47,17],[8,152,122,4,153,123],[22,73,45,3,74,46],[8,53,23,26,54,24],[12,45,15,28,46,16],[3,147,117,10,148,118],[3,73,45,23,74,46],[4,54,24,31,55,25],[11,45,15,31,46,16],[7,146,116,7,147,117],[21,73,45,7,74,46],
[1,53,23,37,54,24],[19,45,15,26,46,16],[5,145,115,10,146,116],[19,75,47,10,76,48],[15,54,24,25,55,25],[23,45,15,25,46,16],[13,145,115,3,146,116],[2,74,46,29,75,47],[42,54,24,1,55,25],[23,45,15,28,46,16],[17,145,115],[10,74,46,23,75,47],[10,54,24,35,55,25],[19,45,15,35,46,16],[17,145,115,1,146,116],[14,74,46,21,75,47],[29,54,24,19,55,25],
[11,45,15,46,46,16],[13,145,115,6,146,116],[14,74,46,23,75,47],[44,54,24,7,55,25],[59,46,16,1,47,17],[12,151,121,7,152,122],[12,75,47,26,76,48],[39,54,24,14,55,25],[22,45,15,41,46,16],[6,151,121,14,152,122],[6,75,47,34,76,48],[46,54,24,10,55,25],[2,45,15,64,46,16],[17,152,122,4,153,123],[29,74,46,14,75,47],[49,54,24,10,55,25],[24,45,15,46,46,16],
[4,152,122,18,153,123],[13,74,46,32,75,47],[48,54,24,14,55,25],[42,45,15,32,46,16],[20,147,117,4,148,118],[40,75,47,7,76,48],[43,54,24,22,55,25],[10,45,15,67,46,16],[19,148,118,6,149,119],[18,75,47,31,76,48],[34,54,24,34,55,25],[20,45,15,61,46,16]],
j.getRSBlocks=function(a,b){var c=j.getRsBlockTable(a,b);if(void 0==c)throw new Error("bad rs block @ typeNumber:"+a+"/errorCorrectLevel:"+b);for(var d=c.length/3,e=[],f=0;d>f;f++)for(var g=c[3*f+0],h=c[3*f+1],i=c[3*f+2],k=0;g>k;k++)e.push(new j(h,i));return e}
,j.getRsBlockTable=function(a,b){switch(b){case d.L:return j.RS_BLOCK_TABLE[4*(a-1)+0];case d.M:return j.RS_BLOCK_TABLE[4*(a-1)+1];case d.Q:return j.RS_BLOCK_TABLE[4*(a-1)+2];case d.H:return j.RS_BLOCK_TABLE[4*(a-1)+3];default:return void 0}},
k.prototype={get:function(a){var b=Math.floor(a/8);return 1==(1&this.buffer[b]>>>7-a%8)},put:function(a,b){for(var c=0;b>c;c++)this.putBit(1==(1&a>>>b-c-1))},getLengthInBits:function(){return this.length},putBit:function(a){var b=Math.floor(this.length/8);
this.buffer.length<=b&&this.buffer.push(0),a&&(this.buffer[b]|=128>>>this.length%8),this.length++}};
var l=[[17,14,11,7],[32,26,20,14],[53,42,32,24],[78,62,46,34],[106,84,60,44],[134,106,74,58],[154,122,86,64],[192,152,108,84],[230,180,130,98],[271,213,151,119],[321,251,177,137],[367,287,203,155],[425,331,241,177],[458,362,258,194],
[520,412,292,220],[586,450,322,250],[644,504,364,280],[718,560,394,310],[792,624,442,338],[858,666,482,382],[929,711,509,403],[1003,779,565,439],[1091,857,611,461],[1171,911,661,511],[1273,997,715,535],[1367,1059,751,593],[1465,1125,805,625],
[1528,1190,868,658],[1628,1264,908,698],[1732,1370,982,742],[1840,1452,1030,790],[1952,1538,1112,842],[2068,1628,1168,898],[2188,1722,1228,958],[2303,1809,1283,983],[2431,1911,1351,1051],[2563,1989,1423,1093],[2699,2099,1499,1139],[2809,2213,1579,1219],[2953,2331,1663,1273]],
o=function(){var a=function(a,b){this._el=a,this._htOption=b};return a.prototype.draw=function(a){function g(a,b){var c=document.createElementNS("http://www.w3.org/2000/svg",a);
for(var d in b)b.hasOwnProperty(d)&&c.setAttribute(d,b[d]);return c}var b=this._htOption,c=this._el,d=a.getModuleCount();Math.floor(b.width/d),Math.floor(b.height/d),this.clear();
var h=g("svg",{viewBox:"0 0 "+String(d)+" "+String(d),width:"100%",height:"100%",fill:b.colorLight});
h.setAttributeNS("http://www.w3.org/2000/xmlns/","xmlns:xlink","http://www.w3.org/1999/xlink"),c.appendChild(h),h.appendChild(g("rect",{fill:b.colorDark,width:"1",height:"1",id:"template"}));
for(var i=0;d>i;i++)for(var j=0;d>j;j++)if(a.isDark(i,j)){var k=g("use",{x:String(i),y:String(j)});
k.setAttributeNS("http://www.w3.org/1999/xlink","href","#template"),h.appendChild(k)}},a.prototype.clear=function(){for(;this._el.hasChildNodes();
)this._el.removeChild(this._el.lastChild)},a}(),p="svg"===document.documentElement.tagName.toLowerCase(),q=p?o:m()?function(){function a(){this._elImage.src=this._elCanvas.toDataURL("image/png"),this._elImage.style.display="block",this._elCanvas.style.display="none"}function d(a,b){var c=this;
if(c._fFail=b,c._fSuccess=a,null===c._bSupportDataURI){var d=document.createElement("img"),e=function(){c._bSupportDataURI=!1,c._fFail&&_fFail.call(c)},f=function(){c._bSupportDataURI=!0,c._fSuccess&&c._fSuccess.call(c)};
return d.onabort=e,d.onerror=e,d.onload=f,d.src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==",void 0}c._bSupportDataURI===!0&&c._fSuccess?c._fSuccess.call(c):c._bSupportDataURI===!1&&c._fFail&&c._fFail.call(c)}
if(this._android&&this._android<=2.1){var b=1/window.devicePixelRatio,c=CanvasRenderingContext2D.prototype.drawImage;
CanvasRenderingContext2D.prototype.drawImage=function(a,d,e,f,g,h,i,j){if("nodeName"in a&&/img/i.test(a.nodeName))for(var l=arguments.length-1;l>=1;l--)arguments[l]=arguments[l]*b;else"undefined"==typeof j&&(arguments[1]*=b,arguments[2]*=b,arguments[3]*=b,arguments[4]*=b);c.apply(this,arguments)}}
var e=function(a,b){this._bIsPainted=!1,this._android=n(),this._htOption=b,this._elCanvas=document.createElement("canvas"),this._elCanvas.width=b.width,this._elCanvas.height=b.height,a.appendChild(this._elCanvas),this._el=a,this._oContext=this._elCanvas.getContext("2d"),
this._bIsPainted=!1,this._elImage=document.createElement("img"),this._elImage.style.display="none",this._el.appendChild(this._elImage),this._bSupportDataURI=null};
return e.prototype.draw=function(a){var b=this._elImage,c=this._oContext,d=this._htOption,e=a.getModuleCount(),f=d.width/e,g=d.height/e,h=Math.round(f),i=Math.round(g);b.style.display="none",this.clear();for(var j=0;e>j;j++)for(var k=0;e>k;k++){var l=a.isDark(j,k),m=k*f,n=j*g;
c.strokeStyle=l?d.colorDark:d.colorLight,c.lineWidth=1,c.fillStyle=l?d.colorDark:d.colorLight,c.fillRect(m,n,f,g),c.strokeRect(Math.floor(m)+.5,Math.floor(n)+.5,h,i),c.strokeRect(Math.ceil(m)-.5,Math.ceil(n)-.5,h,i)}this._bIsPainted=!0},e.prototype.makeImage=function(){this._bIsPainted&&d.call(this,a)},
e.prototype.isPainted=function(){return this._bIsPainted},e.prototype.clear=function(){this._oContext.clearRect(0,0,this._elCanvas.width,this._elCanvas.height),this._bIsPainted=!1},e.prototype.round=function(a){return a?Math.floor(1e3*a)/1e3:a},e}():function(){var a=function(a,b){this._el=a,this._htOption=b};
return a.prototype.draw=function(a){for(var b=this._htOption,c=this._el,d=a.getModuleCount(),e=Math.floor(b.width/d),f=Math.floor(b.height/d),g=['<table style="border:0;border-collapse:collapse;">'],h=0;d>h;h++){g.push("<tr>");
for(var i=0;d>i;i++)g.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:'+e+"px;height:"+f+"px;background-color:"+(a.isDark(h,i)?b.colorDark:b.colorLight)+';"></td>');g.push("</tr>")}g.push("</table>"),c.innerHTML=g.join("");var j=c.childNodes[0],k=(b.width-j.offsetWidth)/2,l=(b.height-j.offsetHeight)/2;
k>0&&l>0&&(j.style.margin=l+"px "+k+"px")},a.prototype.clear=function(){this._el.innerHTML=""},a}();QRCode=function(a,b){if(this._htOption={width:256,height:256,typeNumber:4,colorDark:"#000000",colorLight:"#ffffff",correctLevel:d.H},"string"==typeof b&&(b={text:b}),b)for(var c in b)this._htOption[c]=b[c];
"string"==typeof a&&(a=document.getElementById(a)),this._android=n(),this._el=a,this._oQRCode=null,this._oDrawing=new q(this._el,this._htOption),this._htOption.text&&this.makeCode(this._htOption.text)},QRCode.prototype.makeCode=function(a){this._oQRCode=new b(r(a,this._htOption.correctLevel),this._htOption.correctLevel),this._oQRCode.addData(a),this._oQRCode.make(),this._el.title=a,this._oDrawing.draw(this._oQRCode),this.makeImage()},
QRCode.prototype.makeImage=function(){"function"==typeof this._oDrawing.makeImage&&(!this._android||this._android>=3)&&this._oDrawing.makeImage()},QRCode.prototype.clear=function(){this._oDrawing.clear()},QRCode.CorrectLevel=d}();

// END