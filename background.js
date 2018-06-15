// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

chrome.runtime.onInstalled.addListener(function() {

  chrome.storage.sync.get(['active'], function(data) {
    var isActivated = data.active;
  
    if(isActivated)
    {
          chrome.browserAction.setIcon({
            path:"images/get_started32.png"
        });
  
    }else 
    {
      chrome.browserAction.setIcon({
        path:"images_inactif/get_started32.png"
    });
      
    }
  
  
  });

});


chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) 
{
  if(request.newIconPath)
  {
    chrome.browserAction.setIcon({
      path: request.newIconPath
  });
  }else 
    chrome.browserAction.setBadgeText({text: request.number});
});