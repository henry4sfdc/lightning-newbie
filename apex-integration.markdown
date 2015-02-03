---
layout: default
---

#Apex Integration#

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

You can easily test this using a regular Apex testclass.

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
       helper.getAccounts(component);
    }
})
{% endhighlight %}

Now, in the helper element, paste this code. It's pretty straightforward. Create an action, set a callback and enqueue it for Aura to handle.

{% highlight javascript %}
({
	getAccounts: function(component) {
        var action = component.get("c.getAccounts"); // name on the apex class
        action.setCallback(this, function(a) {
            component.set("v.twentyAccounts", a.getReturnValue());
        });
        $A.enqueueAction(action);
    }		
})
{% endhighlight %}

Now when you preview your application it should now display a list of Accounts.

<img src="images/lightning-components-apex-20accounts.png" width="300px" />

d
