/* ISpaceTest.java

	Purpose:

	Description:

	History:
		Wed Nov 03 16:17:41 CST 2021, Created by katherine

Copyright (C) 2021 Potix Corporation. All Rights Reserved.
*/
package org.zkoss.zephyr.zpr;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import org.zkoss.zephyr.mock.ZephyrTestBase;
import org.zkoss.zul.Space;

/**
 * Test for {@link ISpace}
 *
 * @author katherine
 */
public class ISpaceTest extends ZephyrTestBase {
	@Test
	public void withSpace() {
		// check Richlet API case
		assertEquals(richlet(() -> ISpace.ofHeight("10px")), zul(ISpaceTest::newSpace));

		// check Zephyr file case
		assertEquals(composer(ISpaceTest::newSpace), zul(ISpaceTest::newSpace));

		// check Zephyr file and then recreate another immutable case
		assertEquals(
				thenComposer(() -> {
					Space space = new Space();
					space.setHeight("1px");
					return space;
				}, (ISpace iSpace) -> iSpace.withHeight("10px")),
				zul(ISpaceTest::newSpace));
	}

	private static Space newSpace() {
		Space space = new Space();
		space.setHeight("10px");
		return space;
	}
}