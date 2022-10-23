/* ISeparatorTest.java

	Purpose:

	Description:

	History:
		Wed Nov 03 16:17:11 CST 2021, Created by katherine

Copyright (C) 2021 Potix Corporation. All Rights Reserved.
*/
package org.zkoss.zephyr.zpr;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import org.zkoss.zephyr.mock.ZephyrTestBase;
import org.zkoss.zul.Separator;

/**
 * Test for {@link ISeparator}
 *
 * @author katherine
 */
public class ISeparatorTest extends ZephyrTestBase {
	@Test
	public void withSeparator() {
		// check Richlet API case
		assertEquals(richlet(() -> ISeparator.DEFAULT), zul(ISeparatorTest::newSeparator));

		// check Zephyr file case
		assertEquals(composer(ISeparatorTest::newSeparator), zul(ISeparatorTest::newSeparator));

		// check Zephyr file and then recreate another immutable case
		assertEquals(
				thenComposer(() -> new Separator(), (ISeparator iSeparator) -> iSeparator),
				zul(ISeparatorTest::newSeparator));
	}

	private static Separator newSeparator() {
		return new Separator();
	}
}