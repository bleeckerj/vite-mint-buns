import './style.css'

// document.querySelector('#app').innerHTML = `
//   <h1>Hello Vite!</h1>
//   <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
// `
//console.log(document.querySelector("head"));

document.querySelector('#buns').innerHTML = `
<div id="container">
<div id="containerTop">
  <div id="bun">
    <div id="main">
      <div id="bun-top"><img src="/images/bun-top.png" style="width:100%;padding-bottom:.2em" /></div>
      <div style=""><span class="hatchshow_temp"
          style="display:block;margin-bottom:0.2em;line-height:93.5px;height:130.9px;"><span
            class="hsjs"
            style="color: rgb(165, 61, 24); white-space: pre; font-size: 187px; visibility: visible;">just</span></span><span
          class="hatchshow_temp"
          style="display:block;margin-bottom:0.2em;line-height:75.5px;height:105.69999999999999px;"><span
            class="hsjs"
            style="white-space: pre; font-size: 151px; visibility: visible;">start</span></span><span
          class="hatchshow_temp"
          style="display:block;margin-bottom:0.2em;line-height:65.5px;height:91.69999999999999px;"><span
            class="hsjs"
            style="white-space: pre; font-size: 131px; visibility: visible;">typing</span></span><span
          class="hatchshow_temp"
          style="display:block;margin-bottom:0.2em;line-height:16px;height:22.4px;"><span class="hsjs"
            style="white-space: pre; font-size: 32px; visibility: visible;">(enter &amp; backspace
            work)</span></span></div>
      <div id="bun-bottom"><img src="/images/bun-bottom.png" style="width:100%"></div>
    </div>
  </div>
</div>
<div id="containerBottom">
  <div id="controls">
    <div class="mobileShow">
      <input id="mobileKeyboardKludge" type="text" value="Tap Here to Type" onfocus="keyboardFocus();">
    </div>

    <div id="colorPicker" style="text-align:center;margin:0 auto;">
      <div>
        <button id="bgColorPicker"
          class="jscolor {valueElement:'chosen-value', value:bgColor, width:485,height:300, position:'top', onFineChange:'updateBGColor(this.toHEXString())'}">Pick
          Background Color</button>
      </div>
      <div class="advanced">
        <button id="bgColorPicker2"
          class="jscolor {valueElement:'chosen-value', value:bgColor, width:485,height:300, position:'top', onFineChange:'updateBGColor2(this.toHEXString())'}">Add
          Background Gradient</button>
      </div>
      <div>
        <button id="textColorPicker"
          class="jscolor {valueElement:'chosen-value', value:copyColor, width:485,height:300, position:'top', onFineChange:'updateTextColor(this.toHEXString())'}">Pick
          Text Color</button>
      </div>
      <div class="advanced">
        <button id="textColorPicker2"
          class="jscolor {valueElement:'chosen-value', value:copyColor, width:485,height:300, position:'top', onFineChange:'updateTextColor2(this.toHEXString())'}">Change
          Line Color</button>
      </div>
      <div id="randomizer">
        <button style="background:rgba(255,255,255,0.5);" onclick="randomizeColors();">Randomize
          Colors</button>
      </div>
      <div>
        <button id="modeButton" style="background:rgba(255,255,255,0.5);" onclick="changeMode();"><span
            class="emoji">&#x1F525</span> Extra Toppings</button>
      </div>
      <div id="downloader" style="margin-top:0.5em">
        <button style="background:rgba(255,255,255,0.5);" onclick="renderImage();"><span
            class="emoji">&#x1F3DE</span> Get Image</button>
      </div>
      <div id="sharer">
        <button style="background:rgba(255,255,255,0.5);" onclick="shareImage();"><span
            class="emoji">&#x1F4F2</span> Share Image</button>
      </div>
      <div>
        <button style="background:rgba(255,255,255,0.5);" onclick="downloadImage();"><span
            class="emoji">&#x2B07</span> Download Image</button>
      </div>
      <div id="mint_a_bun">
        <button style="background:rgba(255,255,255,0.5);" onclick="window.tokenUri();"><span
            class="emoji">&#x1F4B8</span> Buy NFT</button>
      </div>
      <div id="like_button_container"></div>
      <div style="margin-top:0.5em">
    <button id="modeButton" style="background:rgba(255,255,255,0.5);" onclick="tokenUri();"><span class="emoji">&#x1F4B8</span> Buns.Life Shop</button>
  </div>
    </div>

    <div style="margin-top:2em">
      <div class="buttonlike" id="email-subscribed" style="display:none">
        <div>Welcome to the Buns Life.</div>
      </div>
      <div id="email-subscribe-form">
        <div>
          <input type="email" value="" class="subscribe" id="email" placeholder="Enter email address"
            required onfocus="pause();" onblur="resume();">
        </div>
        <div>
          <button id="email-signup-button" onClick="emailSignup()">
            Join the Buns Life
          </button>
        </div>
      </div>
    </div>
    <div id="footer">
      <a href="http://twitter.com/ibogost">Ian Bogost</a> made this, for <a
        href="http://bogost.com/projects/buns-life/">some reason</a>. Put words between buns.
    </div>
  </div>

  <div style="text-align:center;margin-bottom:1em">
    <!-- AddToAny BEGIN -->
    <div class="a2a_kit a2a_kit_size_64 a2a_default_style"
      style="width:300px;text-align:center;margin-left:auto;margin-right:auto;">
      <!--a class="a2a_dd" href="https://www.addtoany.com/share"></a-->
      <a class="a2a_button_facebook"></a>
      <a class="a2a_button_twitter"></a>
      <a class="a2a_button_pinterest"></a>
      <a class="a2a_button_email"></a>
    </div>
    <script>
      var a2a_config = a2a_config || {};
      a2a_config.onclick = 1;
      a2a_config.num_services = 4;
    </script>
    <script async src="https://static.addtoany.com/menu/page.js"></script>
    <!-- AddToAny END -->
  </div>
</div>

<div style="text-align:right;margin-left:10px;margin-right:10px;font-size:8pt;font-family:sans-serif;"><a
    href="/shop/privacy.html">Privacy Policy</a> - <a href="/shop/terms.html">Terms of Service</a> - &copy;
  Persuasive Games LLC - DEV</div>
</div>
`

//example of how to shove an element into the DOM
// window.tokenUri() is a function exported from blockchain.js
document.querySelector('#mint_a_bun').innerHTML = `
<button style="background:rgba(255,255,255,0.5);" onclick="window.tokenUri();"><span
class="emoji">&#x1F4B8</span>Mint Bun</button>
`

$(document).ready(function() {
  jscolor.installByClassName("jscolor");
  randomizeColors.installByClassName("randomizeColors");
});

// var code = `<!-- Load React. -->
// <!-- Note: when deploying, replace 'development.js' with 'production.min.js'. -->
// <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
// <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
// <script>alert('Voila!');</script>
// <!-- Load our React component. -->
// <script src="js/like_button.js"></script>`;
// $("#bottom").append(code);

