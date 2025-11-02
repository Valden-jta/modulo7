import type { ReactNode } from 'react';

type SubmenuProps = {
title:string;
children: ReactNode;
}

function Submenu(props: SubmenuProps) {

    const { title,children } = props
  
    return (<>
        <div className="flex flex-col p-3 gap-y-1">
          <span className="font-bold text-uppercase">{title}</span>
            {children}
          </div>
    </>
    )
}

export default Submenu;