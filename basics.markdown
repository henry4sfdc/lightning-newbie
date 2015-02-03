---
layout: default
---

#Lightning Component Basics#

**Create a [Developer Edition](#de). Enable [Lightning Components](#enable). Setup a [Namespace](#namespace). Locate [the Docs](#auradocs).**

Lightning Components have been available in Developer Edition orgs as a beta feature since the Winter 15 release.  There is more than one way to work with them, but the easiest way to start is to create a new Developer Edition, launch the Developer Console, and use the File > New menu option.  The relevant docs are actually in two places.  You can use the Lightning Developer Guide to start and you can see the AuraDocs app, which dynamically updates in your org as you build applications, components and events.

* Note that the [Lightning Quick Start](https://developer.salesforce.com/resource/pdfs/Lightning_QuickStart.pdf) covers some of this material.
* The Spring '15 Release Notes also have [a great section on Lightning Components](http://docs.releasenotes.salesforce.com/en-us/spring15/release-notes/rn_lightning.htm).  

<a name="de"></a>

###Step 1: Create a developer edition.###

Yes, you should [signup for a new developer edition](https://developer.salesforce.com/signup). You're learning something new, and this walk through won't result in anything particularly useful, so I recommend not muddying the waters.

<a name="enable"></a>

###Step 2: Enable Lightning Components###

It's easy as pie. Navigate to Setup > Develop > Lightning Components (or just search for Lightning Components in setup), click on "Enable Lightning Components" and click on Save.

<img src="images/lightning-enable.png" width="600px" />

Once enabled, you'll also see a checkbox for enabling debug mode. I didn't use it while answering these questions, but you can read more about [Lightning Component debug mode](https://help.salesforce.com/HTViewHelpDoc?id=aura_debug_mode.htm&language=en_US) and decide for yourself.

<a name="namespace"></a>

###Step 3: Setup a namespace.###

What's a namespace? Well, if you've never created a managed package, you might not be familiar with this feature. However, if you've ever seen an object created by an AppExchange app, you might have seen a namespace but not known what you were looking at. 

Namespaces are how Salesforce ensures globally unique names. Going Back to the object example, the namespaced object's API name would be something like MyNamespace__ObjectName__c where "MyNamespace" is, as you might have already guessed, the namespace. In general, namespaces only matters when you package something up for other Salesforce users to use, which is why it's in the setup tree near packages.

Namespaces can only be created in a Developer Edition, and once you create a Namespace, you cannot change it. Stick with something that's easy to remember, and that is obvious enough to remind you why you created it in the first place when you read it. Also you'll be typing it from time to time, so shorter is better.

Note: When Spring 15 is released, this step will be optional but still recommended. [Read more](https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/namespaces_using_default.htm).

You can learn more about namespaces in several locations.

* [Lightning Components Developer Guide](https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/namespaces_creating.htm)
* [Help and Training](https://help.salesforce.com/HTViewHelpDoc?id=register_namespace_prefix.htm&language=en_US)
* [ISV Force Guide](https://developer.salesforce.com/docs/atlas.en-us.packagingGuide.meta/packagingGuide/register_namespace_prefix.htm)

Start by navigating to Setup > Create > Packages

<img src="images/packages-step1.png" width="600px" />

In the Developer Settings section, click "edit".

<img src="images/packages-all-about-packages-step2.png" width="600px" />

Read the details about packages and click "continue".

<img src="images/packages-namespace-check-availability-step3.png" width="600px" />

Enter the namespace prefix you would like to use and click "Check Availability". When the namespace you want shows as available, click on "Review My Selections."

<img src="images/packages-namespace-save-step4.png" width="600px" />

If everything looks correct, click "Save".

<img src="images/packages-namespace-done-step5.png" width="600px" />

That's it -- you now have a namespace.



<a name="auradocs"></a>

###Step 4: Get to Know the Docs ###

There are two main sources of documentation: the Lightning Developer Guide and AuraDocs.

You can find the Lightning Developer Guide [online here](https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/) or [download the PDF](http://www.salesforce.com/us/developer/docs/lightning/lightning.pdf). I downloaded the PDF.

The AuraDocs are a little different than the Salesforce docs you might be used to. Instead of being available in the same way as your Apex and Visualforce docs, they're actually their own app inside your org. 

<img src="images/lightning-components-auradocs.png" width="600px" />

This is incredibly cool because they aren't just hosted in your org, they're running in your org. That's right: they're an app and they'll update to include the components you build. See the "Reid002" namespace in the screenshot below? Those are the apps, components and events I created while writing this article.

Access your live AuraDocs at <tt>https://{YourInstance}.lightning.force.com/auradocs</tt>.

