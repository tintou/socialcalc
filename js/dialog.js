//
// SocialCalcSpreadsheetControl
//
/*
// The code module of the SocialCalc package that lets you embed a spreadsheet
// control with toolbar, etc., into a web page.
//
// (c) Copyright 2008, 2009, 2010 Socialtext, Inc.
// All Rights Reserved.
//


/*

LEGAL NOTICES REQUIRED BY THE COMMON PUBLIC ATTRIBUTION LICENSE:

EXHIBIT A. Common Public Attribution License Version 1.0.

The contents of this file are subject to the Common Public Attribution License Version 1.0 (the 
"License"); you may not use this file except in compliance with the License. You may obtain a copy 
of the License at http://socialcalc.org. The License is based on the Mozilla Public License Version 1.1 but 
Sections 14 and 15 have been added to cover use of software over a computer network and provide for 
limited attribution for the Original Developer. In addition, Exhibit A has been modified to be 
consistent with Exhibit B.

Software distributed under the License is distributed on an "AS IS" basis, WITHOUT WARRANTY OF ANY 
KIND, either express or implied. See the License for the specific language governing rights and 
limitations under the License.

The Original Code is SocialCalc JavaScript SpreadsheetControl.

The Original Developer is the Initial Developer.

The Initial Developer of the Original Code is Socialtext, Inc. All portions of the code written by 
Socialtext, Inc., are Copyright (c) Socialtext, Inc. All Rights Reserved.

Contributor: Dan Bricklin.


EXHIBIT B. Attribution Information

When the SpreadsheetControl is producing and/or controlling the display the Graphic Image must be
displayed on the screen visible to the user in a manner comparable to that in the 
Original Code. The Attribution Phrase must be displayed as a "tooltip" or "hover-text" for
that image. The image must be linked to the Attribution URL so as to access that page
when clicked. If the user interface includes a prominent "about" display which includes
factual prominent attribution in a form similar to that in the "about" display included
with the Original Code, including Socialtext copyright notices and URLs, then the image
need not be linked to the Attribution URL but the "tool-tip" is still required.

Attribution Copyright Notice:

 Copyright (C) 2010 Socialtext, Inc.
 All Rights Reserved.

Attribution Phrase (not exceeding 10 words): SocialCalc

Attribution URL: http://www.socialcalc.org/

Graphic Image: The contents of the sc-logo.gif file in the Original Code or
a suitable replacement from http://www.socialcalc.org/licenses specified as
being for SocialCalc.

Display of Attribution Information is required in Larger Works which are defined 
in the CPAL as a work which combines Covered Code or portions thereof with code 
not governed by the terms of the CPAL.

*/

//
// Some of the other files in the SocialCalc package are licensed under
// different licenses. Please note the licenses of the modules you use.
//
// Code History:
//
// Initially coded by Dan Bricklin of Software Garden, Inc., for Socialtext, Inc.
// Unless otherwise specified, referring to "SocialCalc" in comments refers to this
// JavaScript version of the code, not the SocialCalc Perl code.
//

/*

See the comments in the main SocialCalc code module file of the SocialCalc package.

*/

SocialCalc.Dialog = function(id, title, inner_html) {
    var spreadsheet = SocialCalc.GetSpreadsheetControlObject();
    var vp = SocialCalc.GetViewportInfo();
    var pos = SocialCalc.GetElementPositionWithScroll(spreadsheet.spreadsheetDiv);

    var main = document.createElement("div");
    main.id = id + "dialog";
    main.className = "socialcalc-dialog";

    main.style.top = ((vp.height/3)-pos.top) + "px";
    main.style.left = ((vp.width/3)-pos.left) + "px";

    var str = '<div class="socialcalc-titlebar">'+
      '<div class="socialcalc-titlebar-title">'+ title +'</div>'+
      '<div class="socialcalc-titlebar-cross">&#128473;</div></div>'+
      '<div class="socialcalc-dialog-content">'+ inner_html +'</div>';

    main.innerHTML = SocialCalc.LocalizeSubstrings(str);

    var cross = main.getElementsByClassName('socialcalc-titlebar-cross')[0];
    cross.addEventListener('click', function() {
      main.innerHTML = "";
      SocialCalc.DragUnregister(main);
      SocialCalc.KeyboardFocus();

      if (main.parentNode) {
        main.parentNode.removeChild(main);
      }
    }, false);

    SocialCalc.DragRegister(main.firstChild.firstChild, true, true,
                 {MouseDown: SocialCalc.DragFunctionStart, 
                  MouseMove: SocialCalc.DragFunctionPosition,
                  MouseUp: SocialCalc.DragFunctionPosition,
                  Disabled: null, positionobj: main},
                  spreadsheet.spreadsheetDiv);
    return main;
};
