package com.reportingtool.utils;

import java.util.List;

import org.jdom2.filter.Filter;
import org.jdom2.Element;

public class FilterTitle implements Filter {

    private String partner = "";

    public FilterTitle( String title )
    {
        this.partner = partner;
    }

    public boolean matches( Object o )
    {
        if( o instanceof Element )
        {
            String title = ((Element) o).getAttributeValue("title");
             
            return title.matches( title );
        }
        return false;
    }

	@Override
	public Filter and(Filter arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List filter(List arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object filter(Object arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Filter negate() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Filter or(Filter arg0) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Filter refine(Filter arg0) {
		// TODO Auto-generated method stub
		return null;
	}

}