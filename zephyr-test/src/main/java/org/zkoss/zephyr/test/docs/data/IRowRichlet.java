/* IRowRichlet.java

	Purpose:

	Description:

	History:
		Fri Apr 01 16:20:20 CST 2022, Created by katherine

Copyright (C) 2022 Potix Corporation. All Rights Reserved.
*/
package org.zkoss.zephyr.test.docs.data;

import java.util.Arrays;
import java.util.List;

import org.zkoss.zephyr.annotation.Action;
import org.zkoss.zephyr.annotation.RichletMapping;
import org.zkoss.zephyr.ui.Locator;
import org.zkoss.zephyr.ui.StatelessRichlet;
import org.zkoss.zephyr.ui.UiAgent;
import org.zkoss.zephyr.zpr.IButton;
import org.zkoss.zephyr.zpr.IComponent;
import org.zkoss.zephyr.zpr.IGrid;
import org.zkoss.zephyr.zpr.ILabel;
import org.zkoss.zephyr.zpr.IRow;
import org.zkoss.zk.ui.event.Events;

/**
 * A set of example for {@link org.zkoss.zephyr.zpr.IRow} Java Docs.
 * And also refers to something else on <a href="https://www.zkoss.org/wiki/ZK_Component_Reference/Data/Grid/Row">IRow</a>,
 * if any.
 *
 * @author katherine
 * @see org.zkoss.zephyr.zpr.IRow
 */
@RichletMapping("/data/iRow")
public class IRowRichlet implements StatelessRichlet {
	@RichletMapping("/align")
	public List<IComponent> align() {
		return Arrays.asList(
				IGrid.of(IRow.of(ILabel.of("row")).withAlign("center").withId("row")),
				IButton.of("change align").withAction(this::changeAlign)
		);
	}

	@Action(type = Events.ON_CLICK)
	public void changeAlign() {
		UiAgent.getCurrent().smartUpdate(Locator.ofId("row"), new IRow.Updater().align("left"));
	}

	@RichletMapping("/nowrap")
	public List<IComponent> nowrap() {
		return Arrays.asList(
				IGrid.of(IRow.of(ILabel.of("row")).withNowrap(true).withId("row")),
				IButton.of("change nowrap").withAction(this::changeNowrap)
		);
	}

	@Action(type = Events.ON_CLICK)
	public void changeNowrap() {
		UiAgent.getCurrent().smartUpdate(Locator.ofId("row"), new IRow.Updater().nowrap(false));
	}

	@RichletMapping("/valign")
	public List<IComponent> valign() {
		return Arrays.asList(
				IGrid.of(IRow.of(ILabel.of("row")).withValign("bottom").withId("row").withHeight("20px")),
				IButton.of("change valign").withAction(this::changeValign)
		);
	}

	@Action(type = Events.ON_CLICK)
	public void changeValign() {
		UiAgent.getCurrent().smartUpdate(Locator.ofId("row"), new IRow.Updater().valign("top"));
	}
}