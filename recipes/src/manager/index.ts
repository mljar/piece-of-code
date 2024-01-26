
class RecipeManager {
  private static instance: RecipeManager;
  private constructor() { }

  public static getInstance(): RecipeManager {
    if (!RecipeManager.instance) {
      RecipeManager.instance = new RecipeManager();
    }
    return RecipeManager.instance;
  }

  public addRecipe() {
  }
}