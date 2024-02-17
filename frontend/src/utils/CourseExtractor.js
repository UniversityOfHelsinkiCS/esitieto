export function extractCoursesFromModules(modules) {
    const courses = [];

    modules.forEach(module => {
        const moduleName = module.dataNode.name.fi || module.dataNode.name.en; // For localization stories later
      
        if (module.dataNode && module.dataNode.rule && Array.isArray(module.dataNode.rule.rules)) {
          module.dataNode.rule.rules.forEach(rule => {
            if (rule.type === 'CourseUnitRule' && rule.dataNode) {
              const name = rule.dataNode.name.fi || module.dataNode.name.en; // For localization stories later
              const identifier = rule.dataNode.code;
              const course = {
                name: name,
                identifier: identifier,
                dependencies: [], // Populate later when our database is setup
                type: 'mandatory',
                description: 'Kalapuikko',
                moduleName: moduleName
              };
              courses.push(course);
            }
          });
        }
      });
  
    return courses;
}
