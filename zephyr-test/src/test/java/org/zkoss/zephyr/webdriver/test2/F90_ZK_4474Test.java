/* F90_ZK_4414Test.java

	Purpose:
		
	Description:
		
	History:
		Thu Jan 30 14:45:48 CST 2020, Created by jameschu

Copyright (C) 2020 Potix Corporation. All Rights Reserved.
*/
package org.zkoss.zephyr.webdriver.test2;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

import org.zkoss.zephyr.webdriver.ZephyrClientMVVMTestCase;

/**
 * @author jameschu
 */
public class F90_ZK_4474Test extends ZephyrClientMVVMTestCase {
	@Test
	public void test() {
		WebDriver driver = connect();
		sleep(3000);
		waitResponse();
		driver.findElement(By.className("btn")).click();
		waitResponse();
		assertEquals("Hello1", jq("$msg").html());
		driver.findElement(By.id("btn-n")).click();
		waitResponse();
		assertEquals("Hello2", jq("$msg-n").html());
		driver.findElement(By.id("btn-h")).click();
		waitResponse();
		assertEquals("Hello3", jq("$msg-h").html());
	}
}
