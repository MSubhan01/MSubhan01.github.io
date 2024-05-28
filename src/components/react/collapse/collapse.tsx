import { useState, useCallback } from "react";
import styles from "./collapse.module.less";

export interface CollapseItem {
  id: string;
  icon: string;
  link: string;
  title: string;
  className?: string;
}

export interface CollapseProps {
  id: string;
  title: string;
  className?: string;
  closeable?: boolean;
  items: CollapseItem[];
}

export const Collapse = ({
  id,
  title,
  className = "",
  closeable = false,
  items,
}: CollapseProps) => {
  const [open, setOpen] = useState(true);

  const toggle = useCallback(() => setOpen(!open), [open]);

  return (
    <div className={`${styles["collapse-container"]} ${className}`}>
      <div tabindex="0" className={styles["header"]}>
        <span onClick={toggle} className="codicon codicon-chevron-right" />
        <span onClick={toggle} className={styles["title"]} title={title}>
          {title}
        </span>
        {closeable && <a className="codicon codicon-close-all" href="/" />}
      </div>
      <div
        className={`${styles["content"]}`}
        style={{ maxHeight: open && `${items.length * 22}px` }}
      >
        {items.map((item) => (
          <a
            className={`${styles["item"]} ${
              closeable ? styles["selected"] : ""
            }`}
            href={closeable ? undefined : item.link}
          >
            {closeable && <a className="codicon codicon-close" href="/" />}
            <span className="codicon codicon-file-code" />
            <span className={styles["title"]} title={item.title}>
              {item.title}
            </span>
          </a>
        ))}
        <slot />
      </div>
    </div>
  );
};
