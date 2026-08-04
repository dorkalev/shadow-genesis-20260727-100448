use std::process::Command;

#[test]
fn compliance_binary_rejects_unknown_commands() {
    let output = Command::new(env!("CARGO_BIN_EXE_shadow-ci"))
        .arg("not-a-command")
        .output()
        .expect("run shadow-ci");
    assert!(!output.status.success());
    assert!(String::from_utf8_lossy(&output.stderr).contains("usage: shadow-ci"));
}
