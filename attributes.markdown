---
layout: default
---

#All About Attributes#

**[Define](#define) An Attribute. Attributes in [Action](#action). Review [AuraDocs](#auradocs).**

Attributes are named parameters in your component that you can display, manipulate and otherwise interact with throughout the component.

<a name="define"></a>

##Step 1: Create a New Component - BlogComponent 2##

In your Developer Console, navigate to New > Lightning Component, and create a new bundle named BlogComponent2. Add the following code and save.

{% highlight html %}
<aura:component >
	<aura:attribute name="greeting" type="String" default="Hello!" />    
	<h1>Component 2 - Attributes</h1>
    <p>{!v.greeting} from Aura.</p>
</aura:component>
{% endhighlight %}

You'll notice that the attribute is called "greeting" and that the expression <tt>{!v.greeting}</tt> also refers to "greeting". The <tt>{!something}</tt> syntax is likely familiar to anyone who's worked in Visualforce. The v in <tt>{!v.something}</tt> represents the "view". So one way to think of how this component works is that the <tt>&lt;aura:attribute /&gt;</tt> tag puts a field on the view with a default value, and the <tt>{!v.something}</tt> pulls the value of the field out of the view and does something with it.

Next, update the Master component to include a reference to the component you just created.

{% highlight html %}
<aura:component implements="force:appHostable">
	<h1>Blog Component - Master</h1>
    <Reid002:BlogComponent1 />
    <Reid002:BlogComponent2 />
</aura:component>
{% endhighlight %}

And reload the preview of your app on either your regular browser or within the Salesforce1 mobile app.

<img src="images/lightning-component-attributes-hello.png" width="600px" />

You can see that the line <tt>{!v.greeting}</tt> from Aura. renders as exactly what you might have expected: "Hello from Aura."  And because I reloaded the preview from my desktop, where I"m loading the app, all the headlines are red.

<a name="action"></a>

##Step 2: Attributes in Action##

If you've been around XML for a while, you already know what this next section is going to say, because Aura attributes behave like every other attribute you've ever worked with.

Update your master component code to look like this:

{% highlight html %}
<aura:component implements="force:appHostable">
	<h1>Blog Component - Master</h1>
    <Reid002:BlogComponent1 />
    <Reid002:BlogComponent2 greeting="Wassup" />
</aura:component>
{% endhighlight %}

Save and preview and you'll see this:

<img src="images/lightning-attributes-in-action.png" width="600px" />

Pretty cool!

<a name="auradocs"></a>

##Step 3: Let's Look at AuraDocs##

Remember when we first took a look at AuraDocs, the supercool, always up to date, self-documenting thing that keeps up with your code? If not, [click here](basics.html#auradocs).

Navigate to your AuraDocs instance, and ind this component in the AuraDocs app.  What do you notice in the "Attributes" section of the documentation?  It should look approximately like this:

<img src="images/auradocs-attributes.png" width="600px" />

You might notice that my screenshot has a description. I added this in the component by adding a "description" attribute to the <tt>&lt;aura:attribute /&gt;</tt> specification.

{% highlight html %}
<aura:component >
	<aura:attribute name="greeting" type="String" default="Hello" description="This is a sample attribute." />    
	<h1>Component 2 - Attributes</h1>
    <p>{!v.greeting} from Aura.</p>
</aura:component>
{% endhighlight %}
