function extractPathnameSegments(path) {
  const splitUrl = path.split("/");

  return {
    resource: splitUrl[1] || null,
    id: splitUrl[2] || null,
  };
}

function constructRouteFromSegments(pathSegments) {
  let pathname = "";

  if (pathSegments.resource) {
    pathname = pathname.concat(`/${pathSegments.resource}`);
  }

  if (pathSegments.id) {
    pathname = pathname.concat("/:id");
  }

  return pathname || "/";
}

function getActivePathname() {
  return location.hash.replace("#", "") || "/";
}

function getActiveRoute() {
  const pathname = getActivePathname();
  const urlSegments = extractPathnameSegments(pathname);
  return constructRouteFromSegments(urlSegments);
}

function parseActivePathname() {
  const pathname = getActivePathname();
  return extractPathnameSegments(pathname);
}

function getRoute(pathname) {
  const urlSegments = extractPathnameSegments(pathname);
  return constructRouteFromSegments(urlSegments);
}

function parsePathname(pathname) {
  return extractPathnameSegments(pathname);
}

// Export the required functions
module.exports = {
  getActiveRoute,
  parseActivePathname,
  getRoute,
  parsePathname,
};
