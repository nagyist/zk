/* CollectionIndexComposer.java

	Purpose:
		
	Description:
		
	History:
		Created by Dennis

Copyright (C) 2011 Potix Corporation. All Rights Reserved.
 */

package org.zkoss.zephyr.test.mvvm.book.basic;

import org.zkoss.bind.BindContext;
import org.zkoss.bind.Converter;
import org.zkoss.bind.annotation.BindingParam;
import org.zkoss.bind.annotation.Command;
import org.zkoss.bind.annotation.NotifyChange;
import org.zkoss.zk.ui.Component;
import org.zkoss.zul.ListModelList;

/**
 * @author Dennis Chen
 * 
 */
public class CollectionTemplateComboboxVM {
	private String message1;

	ListModelList<Item> items = new ListModelList<Item>();

	public CollectionTemplateComboboxVM() {
		items = new ListModelList<Item>();
		items.add(new Item("A"));
		items.add(new Item("B"));
		items.add(new Item("C"));
		items.add(new Item("D"));
	}

	public ListModelList<Item> getItems() {
		return items;
	}

	@NotifyChange({ "message1" }) @Command
	public void showIndex(@BindingParam("index") Integer index) {
		int i =index.intValue();
		message1 = "item index " + i;
	}

	@NotifyChange({ "items", "message1" }) @Command
	public void delete(@BindingParam("item") Item item ) {
		int i = items.indexOf(item);
		items.remove(item);
		message1 = "remove item index " + i;
	}

	@NotifyChange({ "items", "message1" }) @Command
	public void addAfter(@BindingParam("item") Item item) {
		int i = items.indexOf(item);
		Item newi = new Item(item.getName() + i);
		items.add(i + 1, newi);
		message1 = "addAfter item index " + (i + 1);
	}

	@NotifyChange({ "items","message1" }) @Command
	public void addBefore(@BindingParam("item") Item item) {
		int i = items.indexOf(item);
		Item newi = new Item(item.getName() + i);
		items.add(i, newi);
		message1 = "addBefore item index " + (i + 1);
	}

	public String getMessage1() {
		return message1;
	}

	static public class Item {
		String name;
		
		ListModelList<String> options = new ListModelList<String>();

		public Item(String name) {
			this.name = name;
			options.add(name+" 0");
			options.add(name+" 1");
			options.add(name+" 2");
			options.add(name+" 3");
		}

		public String getName() {
			return name;
		}

		public void setName(String name) {
			this.name = name;
		}

		public ListModelList<String> getOptions() {
			return options;
		}
		
		

	}

	@NotifyChange("items") @Command
	public void reload() {
		
	}
	
	public Converter getStatusConverter1(){
		return new Converter(){

			public Object coerceToUi(Object val, Component component,
					BindContext ctx) {
				String name = (String)ctx.getConverterArg("name");
				Integer si = (Integer)ctx.getConverterArg("si");
				Integer ssi = (Integer)ctx.getConverterArg("ssi");
				return "Model1-"+name+"-"+ssi+"-"+si;
			}

			public Object coerceToBean(Object val, Component component,
					BindContext ctx) {
				return null;
			}
			
		};
	}
	public Converter getStatusConverter2(){
		return new Converter(){

			public Object coerceToUi(Object val, Component component,
					BindContext ctx) {
				String name = (String)ctx.getConverterArg("name");
				Integer si = (Integer)ctx.getConverterArg("si");
				Integer ssi = (Integer)ctx.getConverterArg("ssi");
				return "Model2-"+name+"-"+ssi+"-"+si;
			}

			public Object coerceToBean(Object val, Component component,
					BindContext ctx) {
				return null;
			}
			
		};
	}

}
