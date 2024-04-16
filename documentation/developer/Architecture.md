# 16.5. Architecture of the program WIP

```mermaid
flowchart TD
    subgraph Frontend
    A["MainPage"]
    A --> B["CourseGraph"]
    A --> C["DegreeSelectionMenu"]
    B --> D["SearchBar"]
    A --> E["InfoButton"]
    E --> F["InfoBox"]
    A --> G["SideBar"]
    G --> H["CourseDescription"]
    end

    subgraph Router
    I(("Router"))
    A -."/api/degrees".->I
    C -."/api/degrees/search_by_degree".-> I
    D -."/api/courses/databaseGetCourses".-> I
    H -."/api/kori/search_by_name".->I
    I --> L[MiddleWare]
    end

    subgraph Backend
    L --"/api/degrees"--> K
    L --"/api/degrees/search_by_degree"--> K
    L --"/api/courses/databaseGetCourses"--> K
    L --"/api/kori/search_by_name"--> M
    K["db/index"]
    M[KoriInterface]
    end
    linkStyle 3 stroke:#f33,stroke-width:2px,color:red;
    
```
