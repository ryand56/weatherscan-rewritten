# weatherscan-rewritten
Rewritten version of the original [Weatherscan Emulator](https://github.com/buffbears/Weatherscan) in NextJs. (Basically an organized, readable version) Original credits go to [buffbears](https://github.com/buffbears).

<!-- PURPOSE -->
## Why?
I made this out of curiousity and it was very interesting to me. (Plus that music as well) I managed to find source code but I could barely read it. I ended up making this project in a more modern sense and deployed it as such.

<!-- INSTALLATION -->
## Installation

### Docker
Clone the repository:
```
git clone https://github.com/elementemerald/weatherscan-rewritten.git
```
Rename ``.env.production.sample`` to ``.env.production`` and fill in your keys and then build the image:
```
docker build -t wscan-local .
```

#### CLI
The image can be deployed by running:
```
docker run -d -p 3000:3000 --name wscan-prod wscan-local
```

#### Compose
WIP

<!-- ROADMAP -->
## Roadmap
- [x] Support for celsius units (Implemented in sidebar)
- [x] Music player controls? (Sort of)
- [ ] Fully working and operational

<!-- PREVIEW -->
## Latest Preview
![Preview](https://azure.ryand.ca/projects/weatherscan/41b117ef1aed0d5736092de41157336676c97506.png)

<!-- CONTRIBUTING -->
## Contributing

Any contributions you make are **greatly appreciated**.

If you have an enhancement to add and/or bugfixes to patch, please fork the repository and create a pull request. You can also simply open an issue with the tag "enhancement". If you have found a bug, you can simply open an issue with the tag "bug".
Don't forget to give this project a star. Thanks!

1. Fork the project
2. Create your feature branch (`git checkout -b patch-1`)
3. Commit your changes to the feature branch (`git commit -m 'Add some code'`)
4. Push to the feature branch (`git push origin patch-1`)
5. Open a PR

<!-- LICENSE -->
## License
Copyright (C) 2022 Ryan Omasta - ryand@emeraldsys.xyz
All rights reserved.
Distributed under the MIT License. See `LICENSE` or https://license.ryand.ca for more information.