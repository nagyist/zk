/* ITextboxTest.java

	Purpose:

	Description:

	History:
		Wed Nov 03 17:21:39 CST 2021, Created by katherine

Copyright (C) 2021 Potix Corporation. All Rights Reserved.
*/
package org.zkoss.zephyr.zpr;

import org.junit.jupiter.api.Test;
import org.zkoss.zephyr.mock.ZephyrTestBase;
import org.zkoss.zul.Textbox;

import static org.junit.jupiter.api.Assertions.assertEquals;

/**
 * Test for {@link ITextbox}
 *
 * @author katherine
 */
public class ITextboxTest extends ZephyrTestBase {
	@Test
	public void withTextboxTest() {
		// check Richlet API case
		assertEquals(richlet(() -> ITextbox.of("abc")), zul(ITextboxTest::newTextbox));

		// check Zephyr file case
		assertEquals(composer(ITextboxTest::newTextbox), zul(ITextboxTest::newTextbox));

		// check Zephyr file and then recreate another immutable case
		assertEquals(
				thenComposer(() -> new Textbox("123"), (ITextbox itextbox) -> itextbox.withValue("abc")),
				zul(ITextboxTest::newTextbox));
	}

	private static Textbox newTextbox() {
		return new Textbox("abc");
	}
}