---
layout: default
---

#Events#

**Create and Handle a [Component Event](#component).  Create and Handle an [Application Event](#application).**

At the highest level, you will deal with three kinds of events. System events, such as "init" which we covered earlier, component events and application events. Component events operate within a specific component context and application events operate across components.

The anatomy of an event is pretty simple.  You need three basic ingredients:

* An event definition.
* Something that fires the event.
* Something that handles the event when fired.

The whole goal of events is to keep your application loosely coupled and event driven.

<a name="component"></a>

##Step 1: Create a Component Event##

Create the simplest possible event. In the developer console, click on File > New > Lightning Event. Replace the placeholder code with the following.

{% highlight html %}
<aura:event type="COMPONENT" description="Simplest Possible Event" >
    <aura:attribute name="message" type="String" />
</aura:event>
{% endhighlight %}

Next, create a component to interact with this event. 

{% highlight html %}
<aura:component >
    <aura:registerEvent name="simpleEvent" type="Reid002:SampleLightningEvent1" />
    <aura:handler name="simpleEvent" action="{!c.handleSampleEvent}"/>    
    <aura:attribute name="setMeOnEventFiring" type="String" default="**nothing fired yet" />
    <h1>Component 8 - Events</h1>
    <p>Create an event and then handle it.</p>
    <p><ui:button label="Click me to fire the event" press="{!c.handleClick}"/></p>
    <p>Was the event fired? {!v.setMeOnEventFiring}</p>
</aura:component>
{% endhighlight %}

Notice a few things about this event.

* The <tt>&lt;aura:registerEvent &gt;</tt> tag associates a name <tt>simpleEvent</tt> with a fully qualified event name <tt>Reid002:SampleLightningEvent1</tt>.
* The <tt>&lt;aura:handler &gt;</tt> associates the simple name with a Javascript function to handle it.
* The attribute <tt>setMeOnEventFiring</tt> will be updated when the event is fired.

Finally, add the controller code to fire the event as well as handle it.

{% highlight javascript %}
({
    handleClick : function(component, event) {
		console.log('Controller handle click');
        var compEvent = component.getEvent("simpleEvent");
        compEvent.setParams({ 'message': 'Clicked! ' + 
            (new Date().toGMTString()) });
        compEvent.fire();
    },
    handleSampleEvent : function(component, event, helper) {
		console.log('Controller handle sample event');        
		component.set("v.setMeOnEventFiring", "OK I Set It " + 
            event.getParam( 'message'));        
    }
})
{% endhighlight %}

Notice how the functions "handleClick" and "handleSampleEvent" are completely disconnected. 

Go ahead and update your master component, preview your app and click the button.  It should look something like this.

<img src="images/lightning-events-simplest-event.png" width="600px" />


<a name="application"></a>

##Step 2: Create an Application Event##

Application events communicate across components.

Let's start by creating a new Lightning Event called "SampleApplicationEvent", and replacing the default definition with this:

{% highlight html %}
<aura:event type="APPLICATION" description="Sample Application Event" >
    <aura:attribute name="message" type="String" />
</aura:event>
{% endhighlight %}

Now create the component that fires the event. Note that there's nothing required around registering the event.

{% highlight html %}
<aura:component >
    <h1>Component 7 - Fires Application Events</h1>
    <p>Create an event for other components to handle.</p>
    <p><ui:button label="Click me to fire the event" press="{!c.handleClick}"/></p>	
</aura:component>
{% endhighlight %}

In the Javascript controller, you'll see that we query $A ("Aura") to find the event.  Once found we set the parameters and fire, just like before.

{% highlight javascript %}
({
    handleClick : function(component, event) {
        var appEvent = $A.get("e.Reid002:SampleApplicationEvent");
        appEvent.setParams({ 'message': 'Clicked! ' + (new Date().toGMTString()) });
        appEvent.fire();        
    }
})
{% endhighlight %}

Now let's create the handling component. We do need to specify that it's handling a specific event, so notice the handler tag with the fully qualified event name mapping the event to a Javascript method.

{% highlight html %}
<aura:component >
    <aura:handler event="Reid002:SampleApplicationEvent" action="{!c.handleSampleEvent}"/>
    <aura:attribute name="setMeOnEventFiring" type="String" default="**nothing fired yet" />
    <h1>Component 8 - Handles Application Event</h1>
    <p>Anything? {!v.setMeOnEventFiring}</p>
</aura:component>
{% endhighlight %}

Finally let's add the Javascript to the controller element.

{% highlight javascript %}
({
    handleSampleEvent : function(component, event, helper) {       
        component.set("v.setMeOnEventFiring", 
            "OK I handled it " + event.getParam( 'message'));        
    }
})
{% endhighlight %}

Add both the components you just created to your master component, and, when you preview the page and click the button, your screen should look something like this.

<img src="images/lightning-events-application-event.png" width="600px" />

##Next: [Notes](notes.html)##