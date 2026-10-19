{
  description = "Beryllium — portail d'infrastructure auto-hébergée.";
  inputs.nixpkgs.url = "github:nixos/nixpkgs/nixos-unstable";

  outputs =
    { self, nixpkgs }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
      ];
      forEachSystem =
        f: nixpkgs.lib.genAttrs systems (system: f { pkgs = import nixpkgs { inherit system; }; });
    in
    {
      packages = forEachSystem (
        { pkgs }:
        {
          default = pkgs.buildNpmPackage {
            pname = "beryllium-ovh";
            version = "latest";
            src = ./.;
            npmDepsHash = "sha256-pwNRGUqbEgHISVsU0yIv0V26+Zu+6Abf4oGoOlIN5q8=";
            nativeBuildInputs = [ pkgs.nodejs ];
            buildPhase = "npm run build";
            installPhase = ''
              mkdir -p $out
              cp -r . $out/
            '';
          };
        }
      );

      devShells = forEachSystem (
        { pkgs }:
        {
          default = pkgs.mkShell { buildInputs = [ pkgs.nodejs ]; };
        }
      );
    };
}
