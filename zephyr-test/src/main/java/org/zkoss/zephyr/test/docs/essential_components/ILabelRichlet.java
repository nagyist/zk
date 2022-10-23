/* ILabelRichlet.java

	Purpose:

	Description:

	History:
		Wed Apr 06 16:01:05 CST 2022, Created by katherine

Copyright (C) 2022 Potix Corporation. All Rights Reserved.
*/
package org.zkoss.zephyr.test.docs.essential_components;

import java.util.Arrays;
import java.util.List;

import org.zkoss.zephyr.annotation.Action;
import org.zkoss.zephyr.annotation.RichletMapping;
import org.zkoss.zephyr.ui.Locator;
import org.zkoss.zephyr.ui.StatelessRichlet;
import org.zkoss.zephyr.ui.UiAgent;
import org.zkoss.zephyr.zpr.IButton;
import org.zkoss.zephyr.zpr.IComponent;
import org.zkoss.zephyr.zpr.ILabel;
import org.zkoss.zk.ui.event.Events;

/**
 * A set of example for {@link org.zkoss.zephyr.zpr.ILabel} Java Docs.
 * And also refers to something else on <a href="https://www.zkoss.org/wiki/ZK_Component_Reference/Essential_Components/Label">ILabel</a>,
 * if any.
 *
 * @author katherine
 * @see org.zkoss.zephyr.zpr.ILabel
 */
@RichletMapping("/essential_components/iLabel")
public class ILabelRichlet implements StatelessRichlet {
	@RichletMapping("/maxlength")
	public List<IComponent> maxlength() {
		return Arrays.asList(
				ILabel.ofId("label").withValue("123456").withMaxlength(3),
				IButton.of("change maxlength").withAction(this::changeMaxlength)
		);
	}

	@Action(type = Events.ON_CLICK)
	public void changeMaxlength() {
		UiAgent.getCurrent().smartUpdate(Locator.ofId("label"), new ILabel.Updater().maxlength(5));
	}

	@RichletMapping("/multiline")
	public List<IComponent> multiline() {
		return Arrays.asList(
				ILabel.ofId("label").withValue("1. test.\n2. test2.").withMultiline(true),
				IButton.of("change multiline").withAction(this::changeMultiline)
		);
	}

	@Action(type = Events.ON_CLICK)
	public void changeMultiline() {
		UiAgent.getCurrent().smartUpdate(Locator.ofId("label"), new ILabel.Updater().multiline(false));
	}

	@RichletMapping("/pre")
	public List<IComponent> pre() {
		return Arrays.asList(
				ILabel.ofId("label").withValue("\n\ttest").withPre(true).withMultiline(true),
				IButton.of("change pre").withAction(this::changePre)
		);
	}

	@Action(type = Events.ON_CLICK)
	public void changePre() {
		UiAgent.getCurrent().smartUpdate(Locator.ofId("label"), new ILabel.Updater().pre(false));
	}

	@RichletMapping("/value")
	public List<IComponent> value() {
		return Arrays.asList(
				ILabel.ofId("label").withValue("test"),
				IButton.of("change value").withAction(this::changeValue)
		);
	}

	@Action(type = Events.ON_CLICK)
	public void changeValue() {
		UiAgent.getCurrent().smartUpdate(Locator.ofId("label"), new ILabel.Updater().value("test2"));
	}
}