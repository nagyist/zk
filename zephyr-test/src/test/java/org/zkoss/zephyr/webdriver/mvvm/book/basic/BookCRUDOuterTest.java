/* BookCRUDOuterTest.java

		Purpose:
		
		Description:
		
		History:
				Tue Apr 27 11:31:55 CST 2021, Created by leon

Copyright (C) 2021 Potix Corporation. All Rights Reserved.
*/
package org.zkoss.zephyr.webdriver.mvvm.book.basic;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

import org.zkoss.zephyr.webdriver.TestStage;
import org.zkoss.zephyr.webdriver.ZephyrClientMVVMTestCase;

public class BookCRUDOuterTest extends ZephyrClientMVVMTestCase {
	@Test
	public void test() {
		connect("/mvvm/book/basic/bookCrudOuter.zul");

		assertEquals("include shall work", "ZK MVVM Book CRUD", jq(".z-include .z-window-header").text());
	}
}
