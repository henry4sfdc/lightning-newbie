---
layout: default
---

#Javascript Basics#

**Setting Attributes on [Init](#init). User Interactions with [Buttons](#buttons)**

Lightning Components do really cool things with Javascript.

<a name="init"></a>

##Step 1: Setting Attributes on Init##

The Javascript controller is an integral part of your Lightning Component.  Your component is aware of the controller, and can call the Javascript functions you define in the controller.  Likewise, those functions in your controller can update values expressed in attributes.

Create a new component called BlogComponent3 and paste the following code into it.

{% highlight html %}
<aura:component >
    <h1>Component 3 - Javascript Controller</h1>
    <aura:attribute name="setMeOnInit" type="String" default="default value" />
    <aura:handler name="init" value="{!this}" action="{!c.doInit}"/>
    <p>This value is set in the controller after the component initializes and before
    rendering.</p>
    <p><b>{!v.setMeOnInit}</b></p>
</aura:component>	
{% endhighlight %}

This introduces the <tt>&lt;aura:handler /&gt;</tt> tag. Handlers connect events and code. In this case, the handler connects the "init" event with the Javascript controller action, <tt>doInit</tt>.  Notice that doInit is actually in the same curly brace syntax we saw above, <tt>{!c.doInit}</tt>. "c" refers to the controller.

Once you've saved the component above, you need to create the doInit method in the Javascript controller.  While you're still on the component screen for BlogComponent3, click on the "Controller" element on the right side of the Developer Console. Paste the following code.

{% highlight javascript %}
({
    doInit: function(component, event, helper) {
    	component.set("v.setMeOnInit", "Initialized on " + (new Date().toGMTString()));
    }
})
{% endhighlight %}

Yes, this is pretty standard Javascript.  Note that you're setting a value on the view and that the name matches the attribute you declared on the component.

Update BlogComponentMaster to look like this.

{% highlight html %}
<aura:component implements="force:appHostable">
    <h1>Blog Component - Master</h1>
    <Reid002:BlogComponent1 />
    <Reid002:BlogComponent2 />
    <Reid002:BlogComponent3 />
</aura:component>
{% endhighlight %}

And you can preview however you like and you'll see it looks like this on your web browser.

<img src="images/lightning-component-javascript-controller.png" width="600px" />

Or like this on your mobile device running Salesforce1.

<img src="images/lightning-component-salesforce1-javascript-controller.png" width="300px" />

<a name="buttons"></a>

##Step 2: User Interactions with Buttons##

Init events are great, but a lot of time you really want to handle user gestures, like clicking a button. Aura has a few built in libraries, include a button with an event called "press".

{% highlight html %}
<aura:component >
    <h1>Component 4 - Handling User Events</h1>
    <p>Pulls a list from the controller and renders it when you click on the button.</p>
    <aura:attribute name="sampleArrayAsObject" type="Object" />
    <ui:button label="Click Me" press="{!c.setArrayValues}"/>
    <ul>
        <aura:iteration items="{!v.sampleArrayAsObject}" var="currentItem">
            <li><ui:outputText value="{!currentItem}"/></li>
        </aura:iteration>
    </ul>
</aura:component>
{% endhighlight %}

Next, select the Javascript element on the right, enter the following code and save.

{% highlight javascript %}
({
    setArrayValues : function(component, event, helper) {
		component.set("v.sampleArrayAsObject", 
                      ["Greetings","From","The","Controller", 
                      new Date().toGMTString()]);
    }
})
{% endhighlight %}

When you refresh your preview, you should see the "Click Me" button. Click it to show the list.

<img src="images/lightning-components-ui-events.png" width="600px" />

Now you can easily update this sample to be a little more intereting by changing your code as follows.

{% highlight javascript %}
({
    setArrayValues : function(component, event, helper) {
        if (!component.get("v.sampleArrayAsObject")) {
            component.set("v.sampleArrayAsObject", 
                ["Greetings","From","The","Controller", 
                    new Date().toGMTString()]);
        } else {
            component.set("v.sampleArrayAsObject", null);
        }
    }
})
{% endhighlight %}

##Next: [Apex Integration](apex-integration.html)##
