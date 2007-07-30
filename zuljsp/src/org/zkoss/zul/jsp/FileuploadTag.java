/* FileuploadTag.java

{{IS_NOTE
	Purpose:
		
	Description:
		
	History:
		2007/07/30  09:51:01 , auto generated by Ian Tsai
}}IS_NOTE

Copyright (C) 2007 Potix Corporation. All Rights Reserved.

{{IS_RIGHT
	This program is distributed under GPL Version 2.0 in the hope that
	it will be useful, but WITHOUT ANY WARRANTY.
}}IS_RIGHT
*/
package org.zkoss.zul.jsp;

import org.zkoss.zk.ui.Component;
import org.zkoss.zul.Fileupload;
import org.zkoss.zul.jsp.impl.BranchTag;

/**
 * The JSP tag of {@link Fileupload}.
 * @author Ian Tsai
 *
 */
public class FileuploadTag extends BranchTag {

	protected Component newComponent(Class use) throws Exception{
		return (Component) (use==null?new Fileupload():use.newInstance());
	}

}
