/* IHtmlTest.java

	Purpose:

	Description:

	History:
		Wed Nov 03 15:05:40 CST 2021, Created by katherine

Copyright (C) 2021 Potix Corporation. All Rights Reserved.
*/
package org.zkoss.zephyr.zpr;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import org.zkoss.zephyr.mock.ZephyrTestBase;
import org.zkoss.zul.Html;

/**
 * Test for {@link IHtml}
 *
 * @author katherine
 */
public class IHtmlTest extends ZephyrTestBase {
	@Test
	public void withHtml() {
		// check Richlet API case
		assertEquals(richlet(() -> IHtml.of("abc")), zul(IHtmlTest::newHtml));

		// check Zephyr file case
		assertEquals(composer(IHtmlTest::newHtml), zul(IHtmlTest::newHtml));

		// check Zephyr file and then recreate another immutable case
		assertEquals(
				thenComposer(() -> new Html("abc"), (IHtml iHtml) -> iHtml.withContent("abc")),
				zul(IHtmlTest::newHtml));
	}

	private static Html newHtml() {
		Html html = new Html("abc");
		return html;
	}
}