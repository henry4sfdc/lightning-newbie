---
layout: default
---

#Hello Salesforce1#

**Create Your [First Lightning App](#first). Create Your [First Lightning Component](#component). [Refactor Your Component](#refactor). Create a [Lightning Component Tab](#tab). Deploy to Your [Salesforce1 Mobile App](#salesforce1)**

Hello World is really two things: Hello World on your desktop browser and Hello World on your Salesforce1 mobile app. The good news is that, by design, these two things are mostly the same. Once you have what you need for your desktop, you only need a few more clicks to make that same component ready for Salesforce1.

Before You Begin: Make sure you follow the pre-requisites listed in [Basics](basics.html).

A note about namespaces. My namespace for this sample app is "Reid002". Wherever you see "Reid002" you should substitute your own namespace.

<a name="first"></a>

##Step 1: Create Your First Lightning App##

In your developer console, select File > New > Lightning Application.

<img src="images/developer-console-new-lightning-application.png" width="300px" />

You will then see a standard New Lightning Bundle dialog. These settings control how you will access the app and how it will be documented in AuraDocs.

<img src="images/lightning-component-new-lightning-bundle.png" width="300px" />

You will now see a basic editing screen. Pay attetion to the elements on the right side of your console. These is where you select the type of code you want to add to your app.  Also of note is the "Preview" button at the top. You will use this to preview your app.

<img src="images/lightning-component-app-elements.png" width="600px" />

Next, in the Application element, paste this sample code.

{% highlight xml %}
<aura:application>
    <h1>Hello Blog</h1>
</aura:application>
{% endhighlight %}

Voila! You have created your first Lightning Application. When you click the preview button, you will see this:

<img src="images/lightning-component-simple-app.png" width="600px" />

Next, let's make style it. Select the "Style" element on the right, and replace the default with this CSS.

{% highlight css %}
.THIS {
	color: red;
}
{% endhighlight %}

When you preview again -- and you might have noticed that the preview automatically reloaded -- you'll see this.

<img src="images/lightning-component-simple-app-red.png" width="600px" />

<a name="component"></a>

##Step 2: Create a Sample Component, Add to the Sample App##

Now, instead of a Lightning Application, let's create a Lightning Component.  In the Developer Console, click File > New > New Ligning Component. The prompt for a new Lightning Bundle looks pretty much the same:

<img src="images/lightning-component-new-dialog.png" width="300px" />

And it results is a very similar empty document, except this time it's a component.

<img src="images/lightning-component-new.png" width="600px" />

Note that you again have an element selector on the right, this time without a Preview button.  Start creating this component by pasting the following into the component element.

{% highlight html %}
<aura:component >
	<h1>Component 1 - Hello!</h1>
</aura:component>
{% endhighlight %}

Now navigate back to your Lightning Application window, and update the application so it looks like this. Note that I'm referencing my namespace, Reid002. You should reference your namespace.

{% highlight html %}
<aura:application >
    <h1>Hello Blog</h1>
    <Reid002:BlogComponent1 />
</aura:application>
{% endhighlight %}

And your preview should now look like this:

<img src="images/lightning-app-component-1-red-red.png" width="600px" />

Huzzah! You have a component rendering in an application, and the component is inheriting the style from the application. That's GREAT unless you don't happen to want everything red. So now let's see if we can change the color by changing the stylesheet on BlogComponent1.

{% highlight css %}
.THIS {
    color: blue;
}
{% endhighlight %}

When you preview the app, you'll notice nothing changes.  

<img src="images/lightning-app-component-1-red-red.png" width="600px" />

This lack of change is due to the way CSS works. If you look in your browser's developer tools section, you'll see that the second H1 is rendered like this:

{% highlight html %}
<h1 data-aura-rendered-by="7:2;a" class="Reid002BlogComponent1 Reid002BlogApp1">Component 1 - Hello!</h1>
{% endhighlight %}

Notice how the class representing the app level -- Reid002BlogApp1 -- is the last class listed. CSS resolves conflicts in classes by giving precendence to whatever it sees last.  In this case, it colors everything red. You can indicate that the blue command should be treated as more important using the !important designation. 

Try updating the Style for Component1 as follows

{% highlight css %}
.THIS {
    color: blue !important;
}
{% endhighlight %}

Reload the preview and you'll see it worked.

<img src="images/lightning-app-component-1-red-blue.png" width="600px" />

Now, most people want finer grained control over their CSS, so you might prefer a syntax like this where you limit your color selection to a particular element:

{% highlight css %}
h1.THIS {
    color: blue !important;
}
{% endhighlight %}

Or something like this next snippet where you specify the fully qualified class name instead of using the keyword THIS.

{% highlight css %}
h1.Reid002BlogComponent1 {
    color: blue !important;
}
{% endhighlight %}

Either of those two work fine as well.

<a name="refactor"></a>

##Step 4: Create a Parent Component and Refactor##

Refactoring is important at this stage for two reasons. First, it's important to demonstrate that components can be used in other components.  Second, we're going to turn your work into a Salesforce1 App, which requires we work with a component.

Create a new Lightning Component called BlogComponentMaster, and update the content so it looks like this.

{% highlight html %}
<aura:component >
	<h1>Blog Component - Master</h1>
    <Reid002:BlogComponent1 />
</aura:component>
{% endhighlight %}

Next, refactor your Lightning Application to reference component Master instead of component 1:

{% highlight html %}
<aura:application >
    <h1>Hello Blog</h1>
    <Reid002:BlogComponentMaster />
</aura:application>
{% endhighlight %}

When you reload your preview it should look like this:

<img src="images/lightning-app-master-component.png" width="600px" />

<a name="tab"></a>

##Step 5: Create a Lightning Component Tab for the new Master Component##

Before we can create a tab for the new master component, we need to flag it as "appHostable".  Edit it to add that attribute to your component, and be sure to save when you're done.

{% highlight html %}
<aura:component implements="force:appHostable">
	<h1>Blog Component - Master</h1>
    <Reid002:BlogComponent1 />
</aura:component>
{% endhighlight %}

Next, using the main Setup screen instead of your Developer Console, navigate to Setup > Create > Tabs, and click the New button next to Lightning Component Tabs.

<img src="images/lightning-component-tab.png" width="600px" />

Next, complete the form so it looks approximately like the screenshot below. If you don't see the Master component in your drop down, that means the component doesn't implement appHostable.  I found I didn't save the component, so when I clicked the New button, the new tab wizard didn't recognize BlogComponentMaster as something it could use.

<img src="images/lightning-component-tab-step-1.png" width="600px" />

Next is the standard Add to Profile dialog. Since this is a demo, go ahead and leave Default On for everyone.  Scroll to the bottom and click on Save.

<img src="images/lightning-component-tab-step-2.png" width="600px" />

<a name="salesforce1"></a>

##Step 6: Add to your Salesforce1 Mobile Navigation##

Getting the Lightning Component Tab on your Salesforce1 mobile app is also easy.  On the main setup screen, navigate to Setup > Mobile Administration > Mobile Navigation.  

<img src="images/lightning-tab-mobile-navigation-example.png" width="600px" />

Move the app you created from the left to the right to put it on Salesforce1, and then move it from the bottom to the top in the right menu to make it dead easy to find.  Click Save.

Next, login to Salesforce1 on your mobile device using your new Developer Edition credentials.  Refresh the menu and you'll see the new tab you created at the top.

<img src="images/lightning-blog-menu.png" width="300px" />

Tap on that menu item, Lightning Blog in my case, and you'll see the components you created come on to your screen.

<img src="images/lightning-blog-rendered.png" width="300px" />

"HOLY WOW!" I can hear you exclaim. "But, the headline on my Salesforce1 mobile version of Lightning Blog isn't red!" You are correct. The Lightning App we defined and previews on the desktop specified red in its CSS.  However, what you're seeing on your Salesforce1 mobile device, isn't the Lightning App.  It's the Lightning Component we created from the tab, and it has no such specification in its CSS.  Yes, the blue we specified in BlogComponent1, which is itself embedded in BlogComponentMaster, comes through because that CSS is specified at the component level.