# CHIP-8 Emulator

As a high school student I was very excited to finally own my own graphing calculator. And no, it wasn't because I was very excited to plot parabolas and find roots of polynomials. For years on YouTube and other websites like Hackaday I had seen the homebrew/modding/jailbreaking community showcase the mind-bending capabilities of graphing calculators powerful enough to run games like Doom and even Minecraft!

<iframe width="420" height="315"
src="https://www.youtube.com/embed/JHc9jsIxkFM">
</iframe>

It follows then, that I was very excited to own a TI-Nspire CX II CAS graphing calculator for use at school. However, at the time, the calculator model was relatively newly released. Unlike for the original TI-Nspire, there were no public jailbreaks for the device to allow arbitrary code execution! Instead, I was stuck with the (not very good) default programming capabilities TI decided to put on the device. At the time the only programming languages available were TI-Basic and Lua (nowadays Python is supported as well), and the code had to be saved in a proprietary `.tns` notebook bundle file.

Given the lackluster selection of user-made programs under these constraints, I decided to write my own CHIP-8 emulator in Lua for the TI-Nspire CX II CAS. CHIP-8 was not a real processor ISA, but rather a bytecode format which ran on a variety of mid-1970s computers through the CHIP-8 virtual machine (kind of like the precursor to the JVM, also, wow they had VMs in the 1970s!?). I decided on writing a CHIP-8 emulator because it seemed relatively easy to emulate and there were a good selection of simple games to have fun with like Space Invaders and Tetris, as well as some more modern games made by hobbyists ([My personal favourite](https://johnearnest.github.io/chip8Archive/play.html?p=slipperyslope)).

I encountered a variety of challenges in developing this software, most principally of which was that I had almost never written any Lua code before and I had never programmed any kind of emulator. As such, I decided to loosely follow an online tutorial for developing a CHIP-8 emulator in C++ for a desktop computer, adapting the code to Lua and to the specifics of the TI-Nspire Lua API reference. Using my existing knowledge of programming languages such as Python, JavaScript and C, I was able to roughly understand the C++ code (I had barely ever used C++) and quickly adapt and pick up a working understanding of Lua. As such, with copious consultation of the Nspire Lua API reference guide, I was successful in creating a working emulator.

<img src="../img/chip8.png" alt="Working CHIP-8 emulator on my calculator" width="200"/>

Due to the platform limitations of the TI-Nspire, there are some complexities in loading ROMs into the emulator however. A non-jailbroken Nspire requires all code and data to be stored inside a proprietary `.tns` file format, and there are no file io operations permitted for the program. As such, I wrote a Python script to convert CHIP-8 ROM files into a Lua table of bytes which would be copy pasted into the emulator program source code before running.

---

Source code for emulator available: [here](https://github.com/edward70/codearchive/blob/main/nextchip.lua).
Script for converting a CHIP-8 ROM into a Lua table: [here](https://github.com/edward70/codearchive/blob/main/chip2int.py).
Original tutorial (in C++) used for reference: [here](www.multigesture.net/articles/how-to-write-an-emulator-chip-8-interpreter/).
TI-Nspire Lua API reference guide: [here](https://education.ti.com/en/guidebook/details/en/59108CCE54484B76AF68879C217D47B2/ti-nspire_scripting-api-guide).