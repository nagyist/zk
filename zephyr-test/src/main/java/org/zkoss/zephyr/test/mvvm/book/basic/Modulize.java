package org.zkoss.zephyr.test.mvvm.book.basic;

import java.util.LinkedList;
import java.util.List;
import java.util.Random;

import org.zkoss.bind.annotation.*;

public class Modulize {

	List<Module> modules = new LinkedList<Module>();
	boolean amount_set = false;
	int amount;

	Module selected;

	static Random r = new Random(System.currentTimeMillis());
	int newCount = 0;

	@Init
	public void init(@QueryParam("ms") @Default("1") int moduleSize) {
		for (int i = 0; i < moduleSize; i++) {
			modules.add(new Module1("Default " + i, r.nextInt(100)));
		}
		if (modules.size() > 0) {
			selected = modules.get(0);
		}
	}

	public List<Module> getModules() {
		return modules;
	}

	public Module getSelected() {
		return selected;
	}

	@DependsOn({ "modules" })
	public int getModulesAmount() {
		if (amount_set) {
			return amount;
		}
		amount = 0;
		for (Module m : modules) {
			amount += m.getAmount();
		}
		amount_set = true;
		return amount;
	}

	@Command
	@NotifyChange("selected")
	public void selectModule(@BindingParam("module") Module module) {
		selected = module;
	}

	@Command
	@NotifyChange({ "modules", "selected" })
	public void removeModule(@BindingParam("module") Module module) {
		modules.remove(module);
		if (selected == module) {
			if (modules.size() > 0) {
				selected = modules.get(0);
			} else {
				selected = null;
			}
		}
		amount_set = false;
	}

	@Command
	@NotifyChange({ "modules", "selected" })
	public void addModule(@BindingParam("type") @Default("1") int type) {
		Module m;
		switch (type) {
		case 2:
			m = new Module2("Type2 " + newCount++, r.nextInt(10), r.nextInt(10));
			break;
		default:
			m = new Module1("Type1 " + newCount++, r.nextInt(100));
		}
		modules.add(selected = m);
		amount_set = false;
	}

	@GlobalCommand
	@NotifyChange("modulesAmount")
	public void updateAmount() {
		amount_set = false;
	}
}
