package org.zkoss.zephyr.webdriver.test2;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

import org.zkoss.zephyr.webdriver.ZephyrClientMVVMTestCase;
import org.zkoss.test.webdriver.ztl.JQuery;

/**
 * Created by wenning on 5/5/16.
 */
@Disabled
public class F80_ZK_2582Test extends ZephyrClientMVVMTestCase {

    @Test
    public void test() {
        connect();
        JQuery $textbox = jq("@textbox");
        click($textbox);
        waitResponse();
        sendKeys($textbox, "222");
        waitResponse();
        click(jq(".z-page"));
        waitResponse();
        assertEquals("100\n99\n0\n-100", getZKLog());
    }

}
