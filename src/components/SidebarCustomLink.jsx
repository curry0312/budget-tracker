import { Link, useMatch, useResolvedPath } from "react-router-dom";

function SidebarCustomLink({ title, Icon, to }) {
  const resolvedPath = useResolvedPath(to);
  const isActived = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <Link
      to={to}
      className={
        isActived
          ? `flex items-center my-1 text-white font-Neucha gap-2 px-1 cursor-pointer rounded-full bg-blue-300 hover:bg-blue-300`
          : `flex items-center my-1 text-white font-Neucha gap-2 px-1 cursor-pointer rounded-full hover:bg-blue-300`
      }
    >
      <p>{Icon}</p>
      <p>{title}</p>
    </Link>
  );
}

export default SidebarCustomLink;
