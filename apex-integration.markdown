---
layout: default
---

#Apex Integration#

**Create an [Apex Class](#Apex). Reference the Apex in the [Component](#component). [Refactor](#refactor) Your Controller. Enhance the [SOQL Query](#soql).**


Lightning Components is designed to work with the data in your org. The Apex classes you already know and love work directly with the data, and the Javascript controller and helper elements in your Lightning component definition work with the Apex class.

<a name="apex"></a>

##Step 1: Create An Apex Class##

Creating your Apex class is easy. Create a static method with an <tt>@AuraEnabled</tt> annotation and you're good to go.

{% highlight java %}
public class LightningHelper {
    @AuraEnabled
    public static List<Account> getAccounts() {
        return [Select Name, Id From Account Order By Name Limit 20];
    }
}
{% endhighlight %}

You can easily test this using a regular Apex test class.

<a name="component"></a>

##Step 2: Create a New Component Referencing the New Class##

Next create a component with a reference to the Apex Class you just created in the controller attribute of the component declaration.

{% highlight html %}
<aura:component controller="Reid002.LightningHelper">
    <aura:handler name="init" value="{!this}" action="{!c.doInit}" />
    <aura:attribute name="twentyAccounts" type="Object" />
	<h1>Component 5 - Apex Integration</h1>
    <p>With the help of an @AuraEnabled Apex class, gets a list of twenty Accounts.</p>
    <ul>
    <aura:iteration items="{!v.twentyAccounts}" var="currentItem">
        <li><ui:outputText value="{!currentItem.Name}"/></li>
    </aura:iteration>
    </ul>    
</aura:component>
{% endhighlight %}

In the controller element, create a doInit method. Note that it calls a a method on the helper object.

{% highlight javascript %}
({
	doInit : function(component, event, helper) {
       helper.getMyAccounts(component);
    }
})
{% endhighlight %}

Now, in the helper element, paste this code. It's pretty straightforward. Create an action, set a callback and enqueue it for Aura to handle.

{% highlight javascript %}
({
	getMyAccounts: function(component) {
        var action = component.get("c.getAccounts"); // name on the apex class
        action.setCallback(this, function(a) {
            component.set("v.twentyAccounts", a.getReturnValue());
        });
        $A.enqueueAction(action);
    }		
})
{% endhighlight %}

Finally when you preview your application it should now display a list of Accounts.

<img src="images/lightning-components-apex-20accounts.png" width="300px" />

<a name="refactor"></a>

##Step 3: Refactor Your Code##

Looking at the code above, you might be wondering why the Javascript code is separated into two elements, the controller and the helper. This is a great question.  If you refactor your controller code to include the logic in the helper, you'll see it works just fine.

{% highlight javascript %}
({
	doInit : function(component, event, helper) {
        var action = component.get("c.getAccounts"); // name on the apex class
        action.setCallback(this, function(a) {
            component.set("v.twentyAccounts", a.getReturnValue());
        });
        $A.enqueueAction(action);
    }
})
{% endhighlight %}

<a name="soql"></a>

##Step 4: Enhance Your SOQL##

If you're used to developing in Apex, you know that SOQL queries can get more complicated than the basics above. For example, maybe you want to get a list of contacts at the same time using a subquery. No problem!

Start by updating your Apex class to includes the subquery.

{% highlight html %}
public class LightningHelper {
    @AuraEnabled
    public static List<Account> getAccounts() {
        return [Select Name, Id, (Select Name, Id From Contacts) from Account Order By Name DESC Limit 20];
    }
}
{% endhighlight %}

Next update your component to iterate through the Contacts collection now included with every account.

{% highlight html %}
<aura:component controller="Reid002.LightningHelper">
    <aura:handler name="init" value="{!this}" action="{!c.doInit}" />
    <aura:attribute name="twentyAccounts" type="Object" />
	<h1>Component 5 - Apex Integration</h1>
    <p>With the help of an @AuraEnabled Apex class, gets a list of twenty Accounts.</p>
    <ul>
    <aura:iteration items="{!v.twentyAccounts}" var="currentItem">
        <li>
            <ui:outputText value="{!currentItem.Name}"/>
            <ul>
           	<aura:iteration items="{!currentItem.Contacts}" var="currentContact">
                <li><ui:outputText value="{!currentContact.Name}"/></li>
            </aura:iteration>
            </ul>
        </li>
    </aura:iteration>
    </ul>    
</aura:component>
{% endhighlight %}

When you refresh, your screen should look like this:

<img src="images/lightning-component-apex-subquery.png" width="600px" />

Note that "Contacts", the name of the relationship in Salesforce, also becomes the name of the javascript object containing the data in your component. Although Salesforce is not generally case-sensitive, Javascript very definitely is. If something isn't showing up, check the case.
